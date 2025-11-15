import { ArchivoService } from "#components/Archivos/archivoService"
import Archivo from "#components/Archivos/archivosModel"
import Usuario, { Rol } from "#components/User/UserModel"
import { ComisionUC } from "#components/ComisionUC/ComisionUCModel"
import { datosDelToken } from "#middlewares/auth"
import { Tarea } from "./TareaModel"
import { TareaAttributes } from "./TareaDTO"

export class TareaServices {
    

  //Métodos para estudiantes
  subirTarea = async(datos: TareaAttributes, file?: any) => {
    const t = await Tarea.sequelize!.transaction()
    try {
      const rol = datosDelToken(datos.token)
    } catch (error: any) {
      await t.rollback()
      return {
        status: 500,
        respuesta: error.message || "Ocurrió un error en el servidor al intentar crear un Tarea.",
      }
    }
  }

  modificarTarea = async(id: number, datos: TareaAttributes, nuevo_archivo?: any, eliminar_archivo_ids?: Array<number>) => {
    const t = await Tarea.sequelize!.transaction()
    try {
      const rol = datosDelToken(datos.token)
      
    } catch (error: any) {
      await t.rollback()
      return {
        status: 500,
        respuesta: error.message || "Ocurrió un error en el servidor al intentar crear un Tarea.",
      }
    }
  }

  eliminarArchivoTarea = async(datos: TareaAttributes) => {
    const t = await Tarea.sequelize!.transaction()
    try {
      const rol = datosDelToken(datos.token)
      
    } catch (error: any) {
      await t.rollback()
      return {
        status: 500,
        respuesta: error.message || "Ocurrió un error en el servidor al intentar crear un Tarea.",
      }
    }
  }
}