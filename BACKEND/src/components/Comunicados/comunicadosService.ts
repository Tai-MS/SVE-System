import Comunicado from "./comunicadosModel"
import { comunicadosActualizacion, comunicadosAttributes } from "./comunicadosDTO"
import { ArchivoService } from "#components/Archivos/archivoService"
import Usuario from "#components/User/UserModel"
import { archivoAttributes } from "#components/Archivos/archivoDTO"
import UsuarioComision from "#components/UsuarioComision/UsuarioComisionModel"
import { Comision } from "#components/Comision/ComisionModel"
import { Division } from "#components/Division/divisionModel"
import { Op, where } from "sequelize"
import Archivo from "#components/Archivos/archivosModel"

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

  filtrarUno = async (id: string) => {
    try {
      const respuesta = await Comunicado.findByPk(id)
      if (!respuesta) return { status: 404, respuesta: "No se encontró el comunicado" }
      // Convertimos a objetos con tipo comunicadosAttributes

      // Buscar imágenes
      const plain = respuesta.get({ plain: true })

      const imagenes = await archivoService.buscarImagenes(id as string)
      if (imagenes.status === 200 && imagenes.respuesta.length > 0) {
        plain.img = (imagenes.respuesta as unknown as archivoAttributes[]).map((img) => img.ruta)
      } else {
        plain.img = []
      }

      return { status: 200, respuesta }
    } catch (err) {
      console.error("Error buscando comunicados por usuario:", err)
      return { status: 500, respuesta: "Ocurrió un error al obtener los comunicados." }
    }
  }

  comunicadosPorUsuario = async (idUser: string, type: string, career?: string) => {
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

      if (career) {
        const comunicados = await Comunicado.findAll({
          where: {
            eliminado: false,
            [Op.or]: [whereByType],
          },
          include: {
            model: Usuario,
            attributes: ["nombre", "apellido", "rol"],
          },
          order: [["creado", "DESC"]],
        })

        const comunicadosFinal = comunicados.filter(
          (comunicado) => comunicado.carrera === "ALL" || comunicado.carrera === career
        )

        if (comunicadosFinal.length === 0) {
          return { status: 404, respuesta: "No hay comunicados" }
        }

        return { status: 200, respuesta: comunicadosFinal }
      }

      const comunicados = await Comunicado.findAll({
        where: {
          eliminado: false,
          [Op.or]: [whereByType],
        },
        include: {
          model: Usuario,
          attributes: ["nombre", "apellido", "rol"],
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

  ComunicadosDeUnUsuario = async (id: string) => {
    try {
      const respuestaDB = await Comunicado.findAll({
        where: { eliminado: false, id_usuario: id },
        order: [["creado", "DESC"]],
        include: {
          model: Usuario,
          attributes: ["nombre", "apellido", "rol"],
        },
      })
      if (respuestaDB.length === 0) {
        return { status: 404, respuesta: "No hay comunicados" }
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

      return { status: 200, respuesta: respuesta }
    } catch (err) {
      console.error("Error buscando comunicados de un usuario:", err)
      return { status: 500, respuesta: "Ocurrió un error al obtener los comunicados." }
    }
  }

  actualizarComunicado = async (id: string, data: comunicadosActualizacion) => {
    const t = await Comunicado.sequelize!.transaction()
    try {
      const { imagenesExistentes, archivos, ...datos } = data
      console.log(imagenesExistentes)
      // SCRIPT PARA LA ELIMINACION DE IMAGENES QUE YA ESTABAN INCLUIDAS EN EL COMUNICADO (TIENE EL BUG DE QUE EN CASO QUE LA IMAGEN ESTE EN OTRO COMUNICADO, TAMBIEN SE ELIMINAA. ESTO ES PORQUE COMPARTEN EL MISMO NOMBRE DE RUTA)
      const imagenesComunicado = await archivoService.buscarImagenes(id)
      if (imagenesComunicado.status === 200) {
        if (imagenesExistentes?.length === 0) {
          for (let imagenComunicado of imagenesComunicado.respuesta as Archivo[]) {
            await Archivo.destroy({ where: { ruta: imagenComunicado.ruta }, transaction: t })
          }
        } else {
          const imagenesUrl = (imagenesComunicado.respuesta as Archivo[]).map((imagen) => {
            return imagen.ruta
          })
          for (let imagenUrl of imagenesUrl as string[]) {
            const comprobacion = (imagenesExistentes as string[]).includes(imagenUrl)
            console.log(comprobacion)
            if (!comprobacion) {
              await Archivo.destroy({ where: { ruta: imagenUrl }, transaction: t })
            }
          }
        }
      }
      // ACTUALIZA EL COMUNICADO Y AGREGA LAS IMAGENES QUE ANTES NO ESTABAN
      if (archivos !== undefined) {
        await Comunicado.update(datos, {
          where: {
            id,
          },
          transaction: t,
        })
        const creacionDeArchivos = await archivoService.crear(archivos, "Comunicados", id)
        if (creacionDeArchivos.status !== 200) {
          new Error("Ocurrio un error a la hora de subir las imagenes")
        }
      } else {
        await Comunicado.create(data, { transaction: t })
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
