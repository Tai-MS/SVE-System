import Comunicado from "./comunicadosModel"
import { comunicadosAttributes } from "./comunicadosDTO"
import { ArchivoService } from "#components/Archivos/archivoService"
import Usuario from "#components/User/UserModel"
import { archivoAttributes } from "#components/Archivos/archivoDTO"
import UsuarioComision from "#components/UsuarioComision/UsuarioComisionModel"
import { Comision } from "#components/Comision/ComisionModel"
import { Division } from "#components/Division/divisionModel"
import { Op } from "sequelize"

const archivoService = new ArchivoService()

export class ComunicadoService {
  traerComunicados = async () => {
    const respuestaDB = await Comunicado.findAll({
      where: { eliminado: false, general: true },
      include: {
        model: Usuario,
        attributes: ["nombre", "apellido", "rol"],
      },
      order: [["creado", "DESC"]],
    })

    if (!respuestaDB) {
      return { status: 404, respuesta: "No hay ningún comunicado" }
    }

    // Convertimos a objetos con tipo comunicadosAttributes
    const respuesta: comunicadosAttributes[] = []

    for (const comunicado of respuestaDB) {
      // Sequelize → objeto plano
      const plain = comunicado.get({ plain: true }) as comunicadosAttributes
      plain.img = []
      plain.pdf = []

      // Buscar imágenes
      const imagenes = await archivoService.buscarImagenes(comunicado.id as string)
      if (imagenes.status === 200 && imagenes.respuesta.length > 0) {
        plain.img = (imagenes.respuesta as unknown as archivoAttributes[]).map((img) => img.ruta)
      }

      respuesta.push(plain)
    }

    return { status: 200, respuesta }
  }
  crearComunicado = async (data: comunicadosAttributes) => {
    const t = await Comunicado.sequelize!.transaction()
    try {
      if (data.archivos !== undefined) {
        const { archivos, ...datosComunicado } = data
        const comunicado = await Comunicado.create(datosComunicado, { transaction: t })
        const creacionDeArchivos = await archivoService.crear(archivos, "Comunicados", comunicado.id)
        if (creacionDeArchivos.status !== 200) {
          new Error("Ocurrio un error a la hora de subir las imagenes")
        }
      } else {
        await Comunicado.create(data, { transaction: t })
      }

      await t.commit()
      return { status: 201, respuesta: "El comunicado se ha subido correctamente" }
    } catch (err) {
      await t.rollback()
      console.log(err)
      return { status: 500, respuesta: "Ocurrio un error en el servidor al momento de subir el comunicado" }
    }
  }
  comunicadosPorUsuario = async (idUser: string, type: string) => {
    type FiltroTipo = "comision" | "division"
    try {
      const filtro: FiltroTipo | null = type === "comision" || type === "division" ? (type as FiltroTipo) : null

      if (!filtro) {
        return { status: 400, respuesta: "El parámetro 'type' debe ser 'comision' o 'division'." }
      }

      const user = await Usuario.findByPk(idUser)
      if (!user) return { status: 404, respuesta: "El usuario no existe." }

      const ucRows = await UsuarioComision.findAll({
        where: { usuario_id: idUser },
        attributes: ["comision_id"],
        raw: true,
      })
      if (!ucRows.length) {
        return { status: 404, respuesta: "El usuario no tiene comisión asignada." }
      }

      const comisionIds = Array.from(new Set(ucRows.map((r) => r.comision_id as number)))

      let whereByType: Record<string, any>

      if (filtro === "comision") {
        whereByType = { id_comision: { [Op.in]: comisionIds } }
      } else {
        const comisiones = await Comision.findAll({
          where: { id: { [Op.in]: comisionIds } },
          attributes: ["division_id"],
          raw: true,
        })

        const divisionIds = Array.from(
          new Set(comisiones.map((c) => c.division_id).filter((v) => v != null))
        ) as number[]

        whereByType = divisionIds.length ? { division: { [Op.in]: divisionIds } } : { id: null }
      }

      const comunicados = await Comunicado.findAll({
        where: {
          eliminado: false,
          [Op.or]: [{ general: true }, whereByType],
        },
        order: [["creado", "DESC"]],
      })
      if (comunicados.length === 0) {
        return { status: 404, respuesta: "No hay comunicados" }
      }
      return { status: 200, respuesta: comunicados }
    } catch (err) {
      console.error("Error buscando comunicados por usuario:", err)
      return { status: 500, respuesta: "Ocurrió un error al obtener los comunicados." }
    }
  }

  actualizarComunicado = async (id: string, data: comunicadosAttributes) => {
    const t = await Comunicado.sequelize!.transaction()
    try {
      if (data.archivos !== undefined) {
        const { archivos, ...datosComunicado } = data

        await Comunicado.update(datosComunicado, {
          where: {
            id,
          },
          transaction: t,
        })
      } else {
        await Comunicado.update(data, {
          where: {
            id,
          },
          transaction: t,
        })
      }

      await t.commit()
      return { status: 201, respuesta: "El comunicado se ha actualizaco correctamente" }
    } catch (err) {
      await t.rollback()
      console.log(err)
      return { status: 500, respuesta: "Error en el servidor al momento de actualizar el comunicado" }
    }
  }
  eliminarComunicado = async (id: string) => {
    try {
      await Comunicado.update({ eliminado: true }, { where: { id } })
      return { status: 200, respuesta: "El comunicado se elimino correctamente" }
    } catch (err) {
      console.log(err)
      return { status: 500, respuesta: "Ocurrio un error en el servidor al momento de eliminar el comununicado" }
    }
  }
}
