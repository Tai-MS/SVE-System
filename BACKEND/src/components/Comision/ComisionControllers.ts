import { Request, Response } from "express"
import { ComisionAttributes } from "./ComisionDTO"
import { ComisionSchema } from "./ComisionSchemas"
import { ComisionServices } from "./ComisionServices"
const Comision = new ComisionServices()
export class ComisionControllers {
  crearComision = async (req: Request, res: Response) => {
    const verificacion = await ComisionSchema.safeParseAsync(req.body)
    if (!verificacion.success) {
      res.status(400).json({ respuesta: "Los datos ingresados para crear una comision son incorrectos" })
    } else {
      const data: ComisionAttributes = verificacion.data as unknown as ComisionAttributes
      const respuesta = await Comision.crearComision(data)
      res.status(respuesta.status).json(respuesta.respuesta)
    }
  }

  traerTodas = async (req: Request, res: Response) => {
    const carrera = req.params.carreraID
    console.log(carrera);
    
    const respuesta = await Comision.traerTodas(carrera)
    res.status(respuesta.status).json(respuesta.respuesta)
  }
  verDetallesComision = async (req: Request, res: Response) => {
    const id: number = Number(req.params.id)
    const respuesta = await Comision.buscarComisionPorId(id)
    res.status(respuesta.status).json(respuesta.respuesta)
  }
  modificarComision = async (req: Request, res: Response) => {
    const id: number = Number(req.params.id)
    const newData: ComisionAttributes = req.body
    const respuesta = await Comision.modificarComision(id, newData)
    res.status(respuesta.status).json(respuesta.respuesta)
  }
  eliminarComision = async (req: Request, res: Response) => {
    const id: number = Number(req.params.id)
    const respuesta = await Comision.eliminarComision(id)
    res.status(respuesta.status).json(respuesta.respuesta)
  }
  archivarComision = async (req: Request, res: Response) => {
    const id: number = Number(req.params.id)
    const respuesta = await Comision.archivarComision(id)
    res.status(respuesta.status).json(respuesta.respuesta)
  }
}
