import { ArchivoService } from "#components/Archivos/archivoService"
import Archivo from "#components/Archivos/archivosModel"
import { ComisionUC } from "#components/ComisionUC/ComisionUCModel"
import Usuario, { Rol } from "#components/User/UserModel"
import { datosDelToken } from "#middlewares/auth"
import { MaterialAttributes } from "./MaterialDTO"
import { Material } from "./MaterialModel"

export class MateriaServices {
  private readonly ArchivoServices = new ArchivoService()

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
        console.log(file)

        if (file) {
          const archivo_guardado = await this.ArchivoServices.subirArchivos(file)
          console.log(archivo_guardado)

          if (typeof archivo_guardado !== "string") {
            const link = archivo_guardado.data.webViewLink ?? ""

            const archivo_subido = await Archivo.create(
              {
                ruta: link,
                modulo: "material",
                moduloId: "material.id",
                material_id: material.id,
                file_id: archivo_guardado.data.id!,
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

  modificarMaterial = async (
    id: number,
    datos: Partial<MaterialAttributes>,
    nuevo_archivo?: any,
    eliminar_archivo_ids?: Array<number>
  ) => {
    const t = await Material.sequelize!.transaction()
    try {
      const token = await datosDelToken(datos.token!)

      if (token.rol !== Rol.ESTUDIANTE) {
        const material = await Material.findByPk(id)

        if (!material) {
          await t.rollback()
          return { status: 404, respuesta: "No se encontró el material" }
        }

        if (eliminar_archivo_ids && eliminar_archivo_ids.length > 0) {
          const resultado_eliminacion = await this.ArchivoServices.elimiarArchivoDrive(eliminar_archivo_ids)
          console.log(2)

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
          console.log(4)

          // Guardar en BD
          await Archivo.create(
            {
              ruta: archivo_subido.data.webViewLink ?? "",
              modulo: "material",
              moduloId: "material.id",
              material_id: material.id,
              file_id: archivo_subido.data.id!,
            },
            { transaction: t }
          )
        }

        const { token: _, ...datosLimpios } = datos
        await material.update(datos, { transaction: t })

        await t.commit()

        const archivos_actuales = await Archivo.findAll({
          where: { material_id: material.id },
        })

        return {
          status: 200,
          respuesta: { material, archivos: archivos_actuales },
        }
      }

      await t.rollback()
      return {
        status: 403,
        respuesta: "Esta acción solo puede ser realizada por un usuario de rango superior.",
      }
    } catch (error: any) {
      await t.rollback()
      return {
        status: 500,
        respuesta: error.message || "Ocurrió un error en el servidor al intentar modificar el material",
      }
    }
  }

  traerMaterial = async (id: number) => {
    try {
      const material = await Material.findByPk(id)
      const archivos = await this.ArchivoServices.obtenerArchivos(id)

      if (!material) {
        return { status: 404, respuesta: "No se encontró el material solicitado" }
      }

      if (archivos.status === 500 || archivos.status === 404) {
        return { status: 200, respuesta: material }
      }

      return {
        status: 200,
        respuesta: {
          material,
          archivos: archivos.respuesta,
        },
      }
    } catch (error: any) {
      return { status: 500, respuesta: error.msg || "Ocurrió un error en el servidor al intentar traer el material" }
    }
  }

  eliminarMaterial = async (id: number) => {
    const t = await Material.sequelize!.transaction()
    try {
      const material = await Material.findByPk(id)
      if (!material) {
        return { status: 404, respuesta: "Material no encontrado" }
      }

      const archivos = await Archivo.findAll({
        where: { material_id: material.id },
      })

      if (archivos.length > 0) {
        const ids_archivos = archivos.map((a) => a.id)
        await this.ArchivoServices.elimiarArchivoDrive(ids_archivos)

        await Archivo.destroy({
          where: { material_id: material.id },
          transaction: t,
        })
      }
      await material.destroy({ transaction: t })
      await t.commit()
      return { status: 200, respuesta: "Material eliminado." }
    } catch (error: any) {
      await t.rollback()
      return {
        status: 500,
        respuesta: error.message || "Ocurrió un error en el servidor al intentar traer los materiales",
      }
    }
  }

  traerTodosMateriales = async (datos: any) => {
    try {
      const { com_uc, token } = datos

      const datos_token = await datosDelToken(token)

      const usuario = await Usuario.findByPk(datos_token.id)

      if (!usuario) {
        return { status: 404, respuesta: "Token error" }
      }

      const comision_uc = await ComisionUC.findByPk(com_uc)

      if (!comision_uc) {
        return { status: 404, respuesta: "No se encontro la ComisionUC" }
      }

      const materiales = await Material.findAll({
        where: { comision_uc_id: com_uc },
      })

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
