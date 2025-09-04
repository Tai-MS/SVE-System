import Comunicado from "./comunicadosModel"
import { comunicadosAttributes } from "./comunicadosDTO"

export class ComunicadoService {
  traerComunicados = async () => {
    const respuesta = await Comunicado.findAll()
    if (!respuesta) {
      return { status: 404, respuesta: "No hay ningún comunicado" }
    }

    return { status: 200, respuesta }
  }
  crearComunicado = async (data: comunicadosAttributes) => {
    const { archivos, ...datosComunicado } = data

    await Comunicado.create(datosComunicado)

    return { status: 201, respuesta: "El comunicado se ha subido correctamente" }
  }
}
