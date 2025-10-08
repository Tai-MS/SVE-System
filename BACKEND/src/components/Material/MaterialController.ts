import { MaterialAttributes } from "./MaterialDTO";
import { MaterialSchema } from "./MaterialSchema";
import { MateriaServices } from "./MaterialService";
import { Request, Response } from "express"


const Material = new MateriaServices()

export class MaterialControllers {
    crearMaterial = async (req: Request, res: Response) => {
        const verificacion = await MaterialSchema.safeParseAsync(req.body)
        if(!verificacion.success){
            return res.status(400).json({ respuesta: "Los datos ingresados para crear un material son incorrectos" })
        }

        const data: MaterialAttributes = verificacion.data as unknown as MaterialAttributes
        const respuesta = await Material.crearMaterial(data)
        return res.status(respuesta.status).json(respuesta.respuesta)
    }

    modificarMaterial = async (req: Request, res: Response) => {
        const verificacion = await MaterialSchema.partial().safeParseAsync(req.body)
        
        if(!verificacion.success){
            return res.status(400).json({ respuesta: "Los datos ingresados para modificar un material son incorrectos" })
        }
        const data: MaterialAttributes = verificacion.data as unknown as MaterialAttributes
        const respuesta = await Material.modificarMaterial(Number(req.params.id), data)
        return res.status(respuesta.status).json(respuesta.respuesta)
    }

    traerMaterial = async (req: Request, res: Response) => {
        const id = Number(req.params.id)
        const respuesta = await Material.traerMaterial(id)
        return res.status(respuesta.status).json(respuesta.respuesta)
    }

    traerTodosMateriales = async (req: Request, res: Response) => {
        
        const respuesta = await Material.traerTodosMateriales()
        return res.status(respuesta.status).json(respuesta.respuesta)
    }
}
