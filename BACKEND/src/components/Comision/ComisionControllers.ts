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
}
