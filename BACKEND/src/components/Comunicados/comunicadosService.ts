import Comunicado from "./comunicadosModel"
import { comunicadosAttributes } from "./comunicadosDTO"
import { ArchivoService } from "#components/Archivos/archivoService"
import Usuario from "#components/User/UserModel"

const archivoService = new ArchivoService()

export class ComunicadoService {
  traerComunicados = async () => {
    const respuesta = await Comunicado.findAll({
      where: {
        eliminado: false,
      },
      include: {
        model: Usuario,
        attributes: ["nombre", "apellido"],
      },
      order: [["actualizado", "DESC"]],
    })
    if (!respuesta) {
      return { status: 404, respuesta: "No hay ningún comunicado" }
    }

    return { status: 200, respuesta }
  }
  crearComunicado = async (data: comunicadosAttributes) => {
    const t = await Comunicado.sequelize!.transaction()
    try {
      if (data.archivos !== undefined) {
        const { archivos, ...datosComunicado } = data
        const creacionDeArchivos = await archivoService.crear(archivos, "Comunicados", datosComunicado.id_usuario)
        if (creacionDeArchivos.status !== 200) {
          new Error("Ocurrio un error a la hora de subir las imagenes")
        }
        await Comunicado.create(datosComunicado, { transaction: t })
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
