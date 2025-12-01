import { ArchivoService } from "#components/Archivos/archivoService"
import Archivo from "#components/Archivos/archivosModel"
import Usuario, { Rol } from "#components/User/UserModel"
import { datosDelToken } from "#middlewares/auth"
import { Tarea } from "./TareaModel"
import { TareaAttributes } from "./TareaDTO"
import { Material } from "#components/Material/MaterialModel"

export class TareaServices {
  private readonly ArchivoServices = new ArchivoService()

  traerTarea = async (tarea_id: number, token: string, material_id?: number) => {
    try {
      const solicitante = await datosDelToken(token)
      console.log(tarea_id)
      console.log(typeof tarea_id)
      console.log(token)

      const tarea = (await Usuario.findByPk(solicitante.id, {
        attributes: ["id", "nombre", "apellido"],
        include: [
          {
            model: Tarea,
            as: "Tareas",
            where: {
              id: tarea_id,
            },
            attributes: ["estudiante_id", "creado"],
            include: [
              {
                model: Archivo,
                where: {
                  tarea_id: tarea_id
                },
                attributes: ["ruta", "file_id"],
              },
            ],
          },
        ],
      })) as any
      console.log(tarea)
      console.log(tarea?.Tareas[0])
      // console.log(tarea?.Tareas[0].estudiante_id);

      if (
        solicitante.rol === Rol.ADMINISTRADOR ||
        solicitante.rol === Rol.DIRECTIVO ||
        solicitante.rol === Rol.BEDELIA ||
        solicitante.rol === Rol.PROFESOR ||
        (solicitante.rol === Rol.ESTUDIANTE && tarea?.Tareas[0].estudiante_id === solicitante.id)
      ) {
        return {
          status: 200,
          respuesta: {
            estudiante: tarea?.Tareas[0].estudiante_id,
            tarea: tarea_id,
            archivo: tarea?.Tareas[0],
          },
        }
      }
      return { status: 404, respuesta: "Tarea no encontrada" }
    } catch (error: any) {
      return {
        status: 500,
        respuesta: error.message || "Ocurrió un error en el servidor al intentar crear un Tarea.",
      }
    }
  }
  subirTarea = async (datos: TareaAttributes, file: any) => {
    const t = await Tarea.sequelize!.transaction()
    try {
      const datos_token = await datosDelToken(datos.token)
      if (datos_token.rol !== Rol.ESTUDIANTE) {
        return { status: 403, respuesta: "Está acción sólo puede ser realizada por un estudiante." }
      }

      const archivo_guardado = await this.ArchivoServices.subirArchivos(file)
      console.log(archivo_guardado);
      
      if (typeof archivo_guardado !== "string") {
        const tarea = await Tarea.create({
          ...datos,
          creado: new Date(),
        })
        const link = archivo_guardado.data.webViewLink ?? ""

        await Archivo.create(
          {
            ruta: link,
            modulo: "Tarea",
            moduloId: "material.id",
            material_id: datos.material_id_fk,
            file_id: archivo_guardado.data.id!,
            tarea_id: tarea.id,
          },
          { transaction: t }
        )
        await t.commit()

        return { status: 203, respuesta: "Tarea subida correctamente" }
      }
        return { status: 203, respuesta: "Tarea subida correctamente 2" }

    } catch (error: any) {
      await t.rollback()
      return {
        status: 500,
        respuesta: error.message || "Ocurrió un error en el servidor al intentar crear un Tarea.",
      }
    }
  }

  modificarTarea = async (datos: TareaAttributes, nuevo_archivo?: any, eliminar_archivo_ids?: Array<number>) => {
    const t = await Tarea.sequelize!.transaction()
    try {
      const datos_token = await datosDelToken(datos.token)
      if (datos_token.rol !== Rol.ESTUDIANTE) {
        await t.rollback()
        return { status: 403, respuesta: "Está acción sólo puede ser realizada por un estudiante." }
      }
      const tarea = await Tarea.findByPk(datos.tarea_id!)
      if (!tarea) {
        await t.rollback()
        return { status: 404, respuesta: "No se encontró la tarea" }
      }
      if (eliminar_archivo_ids && eliminar_archivo_ids.length > 0) {
        const resultado_eliminacion = await this.ArchivoServices.elimiarArchivoDrive(eliminar_archivo_ids)

        if (resultado_eliminacion.status === 500) {
          await t.rollback()
          return {
            status: 500,
            respuesta: `Error eliminando archivos: ${resultado_eliminacion.respuesta}`,
          }
        }
      }

      if (nuevo_archivo) {
        const archivo_subido = await this.ArchivoServices.subirArchivos(nuevo_archivo)

        if (typeof archivo_subido === "string") {
          await t.rollback()
          return { status: 500, respuesta: archivo_subido }
        }

        await Archivo.create(
          {
            ruta: archivo_subido.data.webViewLink ?? "",
            modulo: "material",
            moduloId: "material.id",
            material_id: datos.material_id_fk,
            file_id: archivo_subido.data.id!,
            tarea_id: datos.tarea_id!,
          },
          { transaction: t }
        )

        await tarea.update({ modificado: new Date() }, { transaction: t })

        await t.commit()

        const archivos_actuales = await Archivo.findAll({
          where: { tarea_id: tarea.id },
        })

        return {
          status: 200,
          respuesta: { tarea, archivos: archivos_actuales },
        }
      }
    } catch (error: any) {
      await t.rollback()
      return {
        status: 500,
        respuesta: error.message || "Ocurrió un error en el servidor al intentar crear un Tarea.",
      }
    }
  }

  eliminarArchivoTarea = async (datos: TareaAttributes) => {
    const t = await Tarea.sequelize!.transaction()
    try {
      const datos_token = await datosDelToken(datos.token)
      if (datos_token.rol !== Rol.ESTUDIANTE) {
        return { status: 403, respuesta: "Está acción sólo puede ser realizada por un estudiante." }
      }
    } catch (error: any) {
      await t.rollback()
      return {
        status: 500,
        respuesta: error.message || "Ocurrió un error en el servidor al intentar crear un Tarea.",
      }
    }
  }
}
