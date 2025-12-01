import { ArchivoService } from "./archivoService"
import { archivoAttributes } from "./archivoDTO"
import { Request, Response } from "express"

const archivoService = new ArchivoService()

export class ArchivoController {
  obtenerUno = async (req: Request, res: Response) => {}
  obtenerPorUsuario = async (req: Request, res: Response) => {}
}
