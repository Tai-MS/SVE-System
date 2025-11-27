import Archivo from "./archivosModel"
import { archivoAttributes, archivos } from "./archivoDTO"
import { imageURLTrasnform, uploadImage } from "#Utils/cloudinary"
import { drive } from "#Utils/DriveConfig"
import fs from "fs"
import { Readable } from "stream"
import { drive_v3 } from "googleapis"
import {  GaxiosResponseWithHTTP2 } from "googleapis-common"
export class ArchivoService {
  subirArchivos = async (file: any): Promise<GaxiosResponseWithHTTP2<drive_v3.Schema$File> | string> => {
    const t = await Archivo.sequelize!.transaction()
    try {
      const carpeta = process.env.ID_CARPETA
      const fileMetadata = {
        name: file.originalname,
        parents: [carpeta!],
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

  obtenerArchivos = async(material_id: number) => {
    try {
      const archivos = await Archivo.findAll({
        where: {material_id: material_id}
      })

      if(archivos.length === 0){
        return { status: 404, respuesta: "Este material no posee archivos." }
      }

      return { status: 200, respuesta: archivos }

    } catch (error: any) {
      return {
        status: 500,
        respuesta: error.message || "Ocurrió un error en el servidor al intentar traer los materiales",
      }
    }
  }

  elimiarArchivoDrive = async (lista_ids: Array<number>) => {
    const t = await Archivo.sequelize!.transaction()
    try {
      const no_encontrados = []
      for(let id of lista_ids){
        const archivo = await Archivo.findOne({
          where: {id: id},
          transaction: t
        })

        if(!archivo){
          no_encontrados.push(id)
        }else{
          await drive.files.delete({ fileId: archivo.file_id })
          await archivo.destroy({ transaction: t })
        }
      }

      if(no_encontrados.length === lista_ids.length){
        await t.rollback()
        return { status: 404, respuesta: `No se encontraron los archivos` }
      }
      await t.commit()
      if(no_encontrados.length > 0){
        return { status: 207, respuesta: `Se eliminaron los archivos, pero no se encontraron: ${no_encontrados}` }
      }
      return { status: 200, respuesta: "Archivos eliminados" }
    } catch (error) {
      await t.rollback() 
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
