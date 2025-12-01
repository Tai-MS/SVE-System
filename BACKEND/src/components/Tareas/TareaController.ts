import { Request, Response } from "express"
import { TareaServices } from "./TareaService"
import { TareaSchema } from "./TareaSchema"
import { TareaAttributes } from "./TareaDTO"
import { log } from "console"

const Tarea = new TareaServices()

export class TareaControllers {

  traerTarea = async(req: Request, res: Response) => {
    const token = (req.headers["token"] as string) || undefined
    const tarea_id = req.params.tareaId
    console.log(tarea_id);
    console.log(typeof tarea_id);
    
    const respuesta = await Tarea.traerTarea(parseInt(tarea_id), token!)
    return res.status(respuesta.status).json(respuesta.respuesta)
  }
  subirTarea = async (req: Request, res: Response) => {
    const verificacion = await TareaSchema.safeParseAsync(req.body)
    
    if (!verificacion.success) {
      return res.status(400).json({ respuesta: "Los datos ingresados para subir una tarea son incorrectos" })
    }
    const token = (req.headers["token"] as string) || undefined

    const data: TareaAttributes = verificacion.data as unknown as TareaAttributes
    data.token = token!
    const respuesta = await Tarea.subirTarea(data, req.file)

    return res.status(respuesta!.status).json(respuesta?.respuesta)
  }

  modificarTarea = async (req: Request, res: Response) => {
    const verificacion = await TareaSchema.safeParseAsync(req.body)
    console.log(JSON.parse(req.body.eliminar_archivo_ids));
    
    if (!verificacion.success) {
      return res.status(400).json({ respuesta: "Los datos ingresados para subir una tarea son incorrectos" })
    }
    const token = (req.headers["token"] as string) || undefined

    const data: TareaAttributes = verificacion.data as unknown as TareaAttributes
    data.token = token!
    const respuesta = await Tarea.modificarTarea(data, req.file, JSON.parse(req.body.eliminar_archivo_ids))

    return res.status(respuesta!.status).json(respuesta?.respuesta)
  }

  
}
