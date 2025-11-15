import { Request, Response } from "express"
import { TareaServices } from "./TareaService"
import { TareaSchema } from "./TareaSchema"

const Tarea = new TareaServices()

export class TareaControllers{
    subirTarea = async(req: Request, res: Response) => {

    }

    modificarTarea = async(req: Request, res: Response) => {

    }

    eliminarTarea = async(req: Request, res: Response) => {

    }
}