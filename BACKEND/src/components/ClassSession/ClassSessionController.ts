import { Request, Response } from "express"
import { ClassSessionServices } from "./ClassSessionService"
import { ClassSessionSchema } from "./ClassSessionSchema"


const ClassSession = new ClassSessionServices()

export class ClassSessionControllers {
    traerClase = async (req: Request, res: Response) => {
        const id = Number(req.params.id)
        if (isNaN(id)) {
            return res.status(400).json("ID inválido. Debe ser un número.");
        }
        const resp = await ClassSession.traerClase(id)
        return res.status(resp.status).json(resp.respuesta)
    }

    crearClase = async (req: Request, res: Response) => {
        const verificacion = await ClassSessionSchema.safeParseAsync(req.body)
        console.log(verificacion);
        
        if (!verificacion.success) {
            return res.status(400).json({ respuesta: "Los datos ingresados para crear una clase son incorrectos" })
        }
        const respuesta = await ClassSession.crearClase(req.body)
        
        return res.status(respuesta.status).json(respuesta.respuesta)
    }

    modificarClase = async (req: Request, res: Response) => {
        const verificacion = await ClassSessionSchema.partial().safeParseAsync(req.body)
        if (!verificacion.success) {
            return res.status(400).json({ respuesta: "Los datos ingresados para crear una clase son incorrectos" })
        }
        const respuesta = await ClassSession.modificarClase(req.body)
        
        return res.status(respuesta.status).json(respuesta.respuesta)
    }
}