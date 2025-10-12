import Archivo from "./archivosModel"
import { archivoAttributes, archivos } from "./archivoDTO"
import { imageURLTrasnform, uploadImage } from "#Utils/cloudinary"
import { drive } from "#Utils/DriveConfig"
import fs from "fs"
import { Readable } from "stream"
import { drive_v3 } from "googleapis"
import { GaxiosResponse, GaxiosResponseWithHTTP2 } from "googleapis-common"
export class ArchivoService {
  subirArchivos = async (file: any): Promise<GaxiosResponseWithHTTP2<drive_v3.Schema$File> | string> => {
    const t = await Archivo.sequelize!.transaction()
    try {
      const fileMetadata = {
        name: file.originalname,
        parents: ["1XRCvPe8VlhF3VPTBChZihO3A-vEhhTtg"],
      }

      const media = {
        mimeType: file.mimetype,
        body: Readable.from(file.buffer),
      }

      const response = await drive.files.create({
        requestBody: fileMetadata,
        media,
        fields: "id, name, webViewLink, webContentLink",
      })
      
      return response
    } catch (error:any) {
      return `Error al subir el archivo a Google Drive. Error: ${error.message}`
    }
  }

  elimiarArchivoDrive = async (id: number) => {
    const t = await Archivo.sequelize!.transaction()
    try {
      const registro_archivo = await Archivo.findByPk(id)

      if (!registro_archivo) {
        return { status: 404, respuesta: "Archivo no encontrado" }
      }
      
      const response = await drive.files.delete({ fileId: registro_archivo.file_id })

      return response
    } catch (error) {
      return { status: 500, respuesta: "Ocurrio un error al momento de eliminar el archivo de la base de datos" }
    }
  }

  crear = async (archivos: archivos, modulo: string, id: string) => {
    const t = await Archivo.sequelize!.transaction()
    try {
      for (const archivo of archivos) {
        const url = imageURLTrasnform(archivo)
        const imagenSubida = await uploadImage(url, archivo.originalname, modulo)
        if (!imagenSubida.success) {
          return { status: 500, respuesta: "Ocurrio un error al momento de subir la imagen a la base de datos" }
        } else {
          await Archivo.create(
            {
              ruta: imagenSubida.msg,
              modulo: modulo,
              moduloId: id,
            },
            { transaction: t }
          )
        }
      }
      await t.commit()
      return { status: 200, respuesta: "Imagenes subidas correctamente" }
    } catch (err) {
      await t.rollback()
      console.log(err)
      return { status: 500, respuesta: "Ocurrio un error en el servidor al momento de guardar el archivo" }
    }
  }
  buscarImagenes = async (id: string) => {
    try {
      const respuesta = await Archivo.findAll({ where: { moduloId: id }, attributes: ["ruta"] })
      return { status: 200, respuesta }
    } catch (err) {
      console.log(err)
      return { status: 500, respuesta: "Ocurrio un error en el servidor al momento de buscar las imagenes" }
    }
  }
}
