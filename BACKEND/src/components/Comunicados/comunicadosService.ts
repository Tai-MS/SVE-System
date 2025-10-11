import Comunicado from "./comunicadosModel"
import { comunicadosAttributes } from "./comunicadosDTO"
import { ArchivoService } from "#components/Archivos/archivoService"
import Usuario from "#components/User/UserModel"
import { archivo, archivoAttributes } from "#components/Archivos/archivoDTO"

const archivoService = new ArchivoService()

export class ComunicadoService {
  traerComunicados = async () => {
    const respuestaDB = await Comunicado.findAll({
      where: { eliminado: false },
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
  filtrarComunicado = async (id: string) => {
    const respuesta = await Comunicado.findByPk(id)
    if (!respuesta) {
      return { status: 404, respuesta: "No se encontró el comunicado" }
    }
    return { status: 200, respuesta }
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
