import { ComunicadoService } from "./comunicadosService"
import { Request, Response } from "express"
import { comunicadoSchema } from "./comunicadoSchemas"
import { comunicadosAttributes } from "./comunicadosDTO"

const comunicadoService = new ComunicadoService()

export class ComunicadoController {
  todosLosComunicados = async (req: Request, res: Response) => {
    try {
      const respuesta = await comunicadoService.traerComunicados()
      res.status(respuesta.status).json(respuesta.respuesta)
    } catch (err) {
      console.log(err)
    }
  }
  creacionDeComunicado = async (req: Request, res: Response) => {
    try {
      const verificacion = await comunicadoSchema.safeParseAsync(req.body)
      if (verificacion.success!) {
        res.status(400).json({ respuesta: "Los datos ingresados para crear un comunicado son incorrectos" })
      }

      const respuesta = await comunicadoService.crearComunicado(verificacion.data as comunicadosAttributes)
      res.status(respuesta.status).json(respuesta.respuesta)
    } catch (err) {
      console.log(err)
    }
  }
}
