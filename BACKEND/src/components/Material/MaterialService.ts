import { ArchivoService } from "#components/Archivos/archivoService"
import Archivo from "#components/Archivos/archivosModel"
import { ComisionUC } from "#components/ComisionUC/ComisionUCModel"
import Usuario, { Rol } from "#components/User/UserModel"
import { datosDelToken } from "#middlewares/auth"
import { fi } from "zod/locales"
import { MaterialAttributes } from "./MaterialDTO"
import { Material } from "./MaterialModel"

export class MateriaServices {

  crearMaterial = async (datos: MaterialAttributes, file?: any) => {
    const t = await Material.sequelize!.transaction()
    try {
      const token = await datosDelToken(datos.token)

      if (token.rol !== Rol.ESTUDIANTE) {
        const uc = await ComisionUC.findByPk(datos.comision_uc_id)
        if (!uc) {
          return { status: 404, respuesta: "Error. Comision o Unidad Curricular incorrectas" }
        }

        const material = await Material.create(
          {
            ...datos,
            creado: new Date(),
          },
          { transaction: t }
        )
        console.log(file);
        
        if (file) {
          const ArchivoServices = new ArchivoService()
          const archivo_guardado = await ArchivoServices.subirArchivos(file)

          console.log("hol");
          console.log(archivo_guardado);
          console.log(typeof archivo_guardado !== "string");
          if (typeof archivo_guardado !== "string") {
            const link = archivo_guardado.data.webViewLink ?? ""
            
            const archivo_subido = await Archivo.create(
              {
                ruta: link,
                modulo: "material",
                moduloId: "material.id",
                material_id: material.id,
                file_id: archivo_guardado.data.id!
              },
              { transaction: t }
            )
            await t.commit()

            return { status: 203, respuesta: { material, archivo_subido } }
          }
        }

        await t.commit()
        return { status: 203, respuesta: material }
      }

      return {
        status: 304,
        respuesta: "Esta acción solo puede ser realizada por un usuario de rango superior.",
      }
    } catch (error: any) {
      await t.rollback()
      return {
        status: 500,
        respuesta: error.message || "Ocurrió un error en el servidor al intentar crear un material.",
      }
    }
  }

  /**
   * 
   * Terminar funcion modificarMaterial
   * Para poder modificar los archivos relacionados
   * 
   */

  modificarMaterial = async (id: number, datos: Partial<MaterialAttributes>, file?: any) => {
    const t = await Material.sequelize!.transaction()
    try {
      const token = await datosDelToken(datos.token!)
      if (token.rol !== Rol.ESTUDIANTE) {
        const material = await Material.findByPk(id)

        if (!material) {
          return { status: 404, respuesta: "No se encontró el material" }
        }

        

        await material.update(
          {
            ...datos,
          },
          { transaction: t }
        )

        await t.commit()
        return { status: 200, respuesta: material }
      }
      return { status: 304, respuesta: "Esta acción solo puede ser realizada por un suerio de rango superior." }
    } catch (error: any) {
      await t.rollback()

      return {
        status: 500,
        respuesta: error.msg || "Ocurrió un error en el servidor al intentar modificar el material",
      }
    }
  }

  traerMaterial = async (id: number) => {
    try {
      const material = await Material.findByPk(id)

      if (!material) {
        return { status: 404, respuesta: "No se encontró el material solicitado" }
      }

      return { status: 200, respuesta: material }
    } catch (error: any) {
      return { status: 500, respuesta: error.msg || "Ocurrió un error en el servidor al intentar traer el material" }
    }
  }

  traerTodosMateriales = async () => {
    try {
      const materiales = await Material.findAll()

      if (!materiales) {
        return { status: 404, respuesta: "No se encontraron materiales" }
      }

      return { status: 200, respuesta: materiales }
    } catch (error: any) {
      return {
        status: 500,
        respuesta: error.message || "Ocurrió un error en el servidor al intentar traer los materiales",
      }
    }
  }
}
