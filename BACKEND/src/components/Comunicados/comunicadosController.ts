import { ComunicadoService } from "./comunicadosService"
import { Request, Response } from "express"
import { comunicadoSchema } from "./comunicadoSchemas"
import { comunicadosAttributes } from "./comunicadosDTO"

const comunicadoService = new ComunicadoService()

export class ComunicadoController {
  todosLosComunicados = async (req: Request, res: Response) => {
    const respuesta = await comunicadoService.traerComunicados()
    res.status(respuesta.status).json(respuesta.respuesta)
  }
  creacionDeComunicado = async (req: Request, res: Response) => {
    const verificacion = await comunicadoSchema.safeParseAsync(req.body)
    if (!verificacion.success) {
      res.status(400).json({ respuesta: "Los datos ingresados para crear un comunicado son incorrectos" })
    } else {
      const respuesta = await comunicadoService.crearComunicado(verificacion.data as unknown as comunicadosAttributes)
      res.status(respuesta.status).json(respuesta.respuesta)
    }
  }
  obtenerUnComunicado = async (req: Request, res: Response) => {
    const id_comunicado = req.params.id
    const respuesta = await comunicadoService.filtrarComunicado(id_comunicado as string)
    res.status(respuesta.status).json(respuesta.respuesta)
  }
  actualizarUnComunicado = async (req: Request, res: Response) => {
    const id_comunicado = req.params.id
    const verificacion = await comunicadoSchema.safeParseAsync(req.body)
    if (!verificacion.success) {
      res.status(400).json({ respuesta: "Los datos ingresados para actualizar un comunicado son incorrectos" })
    } else {
      const respuesta = await comunicadoService.actualizarComunicado(
        id_comunicado as string,
        verificacion.data as unknown as comunicadosAttributes
      )
      res.status(respuesta.status).json(respuesta.respuesta)
    }
  }
}
