import { ClassRoomSchema } from "./ClassRoomSchema";
import { ClassRoomServices } from "./ClassRoomService";
import { Request, Response } from "express"


const ClassRoom = new ClassRoomServices()

export class ClassRoomControllers {
    traerAula = async (req: Request, res: Response) => {
        const id = Number(req.params.id)
        if (isNaN(id)) {
            return res.status(400).json("ID inválido. Debe ser un número.");
        }
        const resp = await ClassRoom.traerAula(id)
        return res.status(resp.status).json(resp.respuesta)
    }

    crearAula = async (req: Request, res: Response) => {
        const verificacion = await ClassRoomSchema.safeParseAsync(req.body)
        if (!verificacion.success) {
            return res.status(400).json({ respuesta: "Los datos ingresados para crear una clase son incorrectos" })
        }
        const respuesta = await ClassRoom.crearAula(req.body)
        
        return res.status(respuesta.status).json(respuesta.respuesta)
    }

    modificarAula = async (req: Request, res: Response) => {
        const verificacion = await ClassRoomSchema.partial().safeParseAsync(req.body)
        if (!verificacion.success) {
            return res.status(400).json({ respuesta: "Los datos ingresados para crear una clase son incorrectos" })
        }
        const respuesta = await ClassRoom.modificarAula(req.body)
        
        return res.status(respuesta.status).json(respuesta.respuesta)
    }
}