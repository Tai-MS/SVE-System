import { ArchivoService } from "./archivoService"
import { archivoAttributes } from "./archivoDTO"
import { Request, Response } from "express"

const archivoService = new ArchivoService()

export class ArchivoController {
  obtenerUno = async (req: Request, res: Response) => {}
  obtenerPorUsuario = async (req: Request, res: Response) => {}
  obtenerArchivos = async(req: Request, res: Response) => {
    const lista_ids = req.body.lista_ids
    const respuesta = await archivoService.obtenerArchivos(Number(lista_ids)
  )
    return respuesta
  }
}
