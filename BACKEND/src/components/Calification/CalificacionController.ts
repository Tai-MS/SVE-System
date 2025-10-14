import { CalificacionAttributes } from './CalificacionDTO';
import { CalificacionSchema } from './CalificacionSchema';
import { CalificacionServices } from './CalificacionService';
import { Request, Response } from "express"

const Calificacion = new CalificacionServices()

export class CalificacionController{
    asignarCalificacion = async (req: Request, res: Response) => {
        const verificacion = await CalificacionSchema.safeParseAsync(req.body)
        if(!verificacion.success){
            return res.status(400).json({respuesta: "Los datos ingresados para asignar una calificacion son erroneos."})
        }
        const data = req.body
        const respuesta = await Calificacion.asignarCalificacion(data)
        return res.status(respuesta.status).json(respuesta.respuesta)
    }

    modificarCalificacion = async (req: Request, res: Response) => {
        const verificacion = await CalificacionSchema.partial().safeParseAsync(req.body)
        if(!verificacion.success){
            return res.status(400).json({respuesta: "Los datos ingresados para modificar una calificacion son erroneos."})
        }
        const data = req.body
        const id = Number(req.params.id)
        const respuesta = await Calificacion.modificarCalificacion(id, data)
        return res.status(respuesta.status).json(respuesta.respuesta)

    }

    traerCalificacion = async (req: Request, res: Response) => {
        const id = Number(req.params.id)
        const respuesta = await Calificacion.traerInformacion(id)
        return res.status(respuesta.status).json(respuesta.respuesta)
    }
}