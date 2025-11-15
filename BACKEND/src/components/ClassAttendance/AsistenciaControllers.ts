import { AsistenciaServices } from "./AsistenciaServices"
import { AsistenciaAttributes } from "./AsistenciaDTO"
import { AsistenciaSchema } from "./AsistenciaSchema"
import { Request, Response } from "express"

const Asistencia = new AsistenciaServices()

export class AsistenciaControllers {
  crearAsistencia = async (req: Request, res: Response) => {
    const verificacion = await AsistenciaSchema.safeParseAsync(req.body)
    if (!verificacion.success) {
      res.status(400).json({ respuesta: "Los datos ingresados para crear una asistencia son incorrectos" })
    } else {
      const data: AsistenciaAttributes = verificacion.data as AsistenciaAttributes
      const respuesta = await Asistencia.crearAsistencia(data)
      res.status(respuesta.status).json(respuesta.respuesta)
    }
  }

  obtenerAsistenciasQuery = async (req: Request, res: Response) => {
    const filtros = req.query
    const respuesta = await Asistencia.buscarAsistenciaQuery(filtros)
    res.status(respuesta.status).json(respuesta.respuesta)
  }

  obtenerAsistenciaPorId = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const respuesta = await Asistencia.buscarAsistenciaPorId(id)
    res.status(respuesta.status).json(respuesta.respuesta)
  }

  actualizarAsistencia = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const verificacion = await AsistenciaSchema.safeParseAsync(req.body)
    if (!verificacion.success) {
      res.status(400).json({ respuesta: "Los datos ingresados para actualizar la asistencia son incorrectos" })
    } else {
      const data: AsistenciaAttributes = verificacion.data as AsistenciaAttributes
      const respuesta = await Asistencia.modificarAsistencia(id, data)
      res.status(respuesta.status).json(respuesta.respuesta)
    }
  }

  eliminarAsistencia = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const respuesta = await Asistencia.eliminarAsistencia(id)
    res.status(respuesta.status).json(respuesta.respuesta)
  }
}
