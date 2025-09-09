import Archivo from "./archivosModel"
import { archivoAttributes, archivos } from "./archivoDTO"
import { imageURLTrasnform, uploadImage } from "#Utils/cloudinary"

export class ArchivoService {
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
