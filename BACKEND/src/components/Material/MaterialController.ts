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
        const token = req.headers["auth-token"] as string || undefined

        const data: MaterialAttributes = verificacion.data as unknown as MaterialAttributes
        data.token = token!
        const respuesta = await Material.crearMaterial(data, req.file)

        return res.status(respuesta.status).json(respuesta.respuesta)
    }

    modificarMaterial = async (req: Request, res: Response) => {
        const verificacion = await MaterialSchema.partial().safeParseAsync(req.body)
        const token = req.headers["auth-token"] as string || undefined
        
        if(!verificacion.success){
            return res.status(400).json({ respuesta: "Los datos ingresados para modificar un material son incorrectos" })
        }

        const nuevo_archivo = req.file
        const eliminar_archivo_ids = req.body.eliminar_archivo_ids
        const data: MaterialAttributes = verificacion.data as unknown as MaterialAttributes
        data.token = token!
        console.log(nuevo_archivo);
        
        const respuesta = await Material.modificarMaterial(Number(req.params.id), data, nuevo_archivo, eliminar_archivo_ids)

        return res.status(respuesta.status).json(respuesta.respuesta)
    }

    traerMaterial = async (req: Request, res: Response) => {
        const id = Number(req.params.id)
        const respuesta = await Material.traerMaterial(id)
        return res.status(respuesta.status).json(respuesta.respuesta)
    }

    eliminarMaterial = async (req: Request, res: Response) => {
        const lista_ids = Number(req.params.id)
        const respuesta = await Material.eliminarMaterial(lista_ids)
        return res.status(respuesta.status).json(respuesta.respuesta)
    }

    traerTodosMateriales = async (req: Request, res: Response) => {
        const token = req.headers["auth-token"] as string || undefined
        
        const respuesta = await Material.traerTodosMateriales({com_uc: req.params.com_uc, token: token})
        return res.status(respuesta.status).json(respuesta.respuesta)
    }
}
