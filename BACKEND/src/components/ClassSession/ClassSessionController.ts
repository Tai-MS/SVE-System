import { Request, Response } from "express"
import { ClassSessionServices } from "./ClassRoomService"


const ClassSession = new ClassSessionServices()

export class ClassSessionControllers {
    traerClase = async (req: Request, res: Response) => {}

    crearClase = async (req: Request, res: Response) => {
        const respuesta = await ClassSession.crearClase(req.body)
        
        return res.status(respuesta.status).json(respuesta.respuesta)
    }

    modificarClase = async (req: Request, res: Response) => {}
}