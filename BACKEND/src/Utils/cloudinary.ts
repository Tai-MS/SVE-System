import "dotenv/config"
import { v2 as cloudinary } from "cloudinary"
import { File } from "buffer"
import { archivo } from "#components/Archivos/archivoDTO"

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
})

export const uploadImage = async (archivo: string, id_nombre: string, folder = "SVS") => {
  try {
    switch (folder) {
      case "Comunicados":
        folder = "SVS/Comunicados"
        break
      case "Trabajos":
        folder = "SVS/Trabajos"
        break
      case "Material_clase":
        folder = "SVS/Material_clase"
        break
    }

    const result = await cloudinary.uploader.upload(archivo, {
      auto_tagging: 0.75,
      resource_type: "auto",
      unique_filename: true,
      public_id: id_nombre,
      folder,
    })

    return { success: true, msg: result.url }
  } catch (err) {
    console.log(err)
    return { success: false, msg: `Error al momento de subir la imagen` }
  }
}

// ARREGLAR ESTA FUNCION

// export const destroyImage = async (archivo: string) => {
//   try {
//     const public_id = getPublicIdFromUrl(archivo)
//     await cloudinary.uploader.destroy(public_id)

//     return { success: true, msg: "destroyed" }
//   } catch (err) {
//     console.log(err)
//     return { success: false, msg: `Error al momento de borrar la imagen` }
//   }
// }

function getPublicIdFromUrl(url: string) {
  const regex = /\/upload\/(?:v\d+\/)?(.+)\.[a-zA-Z]+$/
  const matches = url.match(regex)
  if (matches) {
    return decodeURIComponent(matches[1]) // Decodificar espacios y caracteres especiales
  }
  return null
}

export const imageURLTrasnform = (data: archivo) => {
  const b64 = Buffer.from(data.buffer).toString("base64")
  let dataURI = "data:" + data.mimetype + ";base64," + b64
  return dataURI
}
