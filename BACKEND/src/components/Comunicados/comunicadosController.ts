import { ComunicadoService } from "./comunicadosService"
import { Request, Response } from "express"
import { comunicadoSchema, comunicadoUpdateSchema } from "./comunicadoSchemas"
import { comunicadosAttributes } from "./comunicadosDTO"
import { string } from "zod"

const comunicadoService = new ComunicadoService()

export class ComunicadoController {
  obtenerTodos = async (req: Request, res: Response) => {
    const respuesta = await comunicadoService.traerComunicados()
    res.status(respuesta.status).json(respuesta.respuesta)
  }
  crear = async (req: Request, res: Response) => {
    const archivos = req.files
    if (archivos) {
      req.body.archivos = archivos
    }
    // VERIFICA SI EL COMUNICADO ES GENERAL
    req.body.general ? (req.body = { ...req.body, general: true }) : (req.body = { ...req.body, general: false })
    // VERIFICA SI EL COMUNICADO ES PARA UNA COMISION
    if (req.body.comision) req.body = { ...req.body, comision: Number(req.body.comision) }
    // VERIFICA SI EL COMUNICADO ES PARA UNA DIVISION
    if (req.body.division && req.body.carrera)
      req.body = { ...req.body, carrera: req.body.carrera, division: Number(req.body.division) }
    const verificacion = await comunicadoSchema.safeParseAsync(req.body)
    if (!verificacion.success) {
      res.status(400).json({
        respuesta: "Los datos ingresados para crear un comunicado son incorrectos: " + verificacion.error.message,
      })
    } else {
      console.log(verificacion.data)
      const respuesta = await comunicadoService.crearComunicado(verificacion.data as unknown as comunicadosAttributes)
      res.status(respuesta.status).json(respuesta.respuesta)
    }
  }

  filtrar = async (req: Request, res: Response) => {
    const id = req.params.id

    const respuesta = await comunicadoService.filtrarUno(id as string)
    res.status(respuesta.status).json(respuesta.respuesta)
  }

  comunicadosPorUsuario = async (req: Request, res: Response) => {
    const { idUser, type, career } = req.query

    if (!idUser) {
      return res.status(400).json("Falta el parámetro 'idUser'")
    }

    if (!type) {
      return res.status(400).json("Falta el parámetro 'type' ('comision' | 'division')")
    }

    const respuesta = await comunicadoService.comunicadosPorUsuario(idUser as string, type as string, career as string)

    return res.status(respuesta.status).json(respuesta.respuesta)
  }

  comunicadosDeUnUsuario = async (req: Request, res: Response) => {
    const idUser = req.params.idUser

    const respuesta = await comunicadoService.ComunicadosDeUnUsuario(idUser as string)
    return res.status(respuesta.status).json(respuesta.respuesta)
  }

  actualizar = async (req: Request, res: Response) => {
    const id_comunicado = req.params.id
    const archivos = req.files
    if (archivos) {
      req.body.archivos = archivos
    }
    req.body.imagenesExistentes
      ? (req.body = { ...req.body, imagenesExistentes: JSON.parse(req.body.imagenesExistentes) })
      : (req.body = { ...req.body, imagenesExistentes: [] })
    // Asegurar boolean
    req.body.general = Boolean(req.body.general)

    // Manejar id_comision
    req.body.id_comision = req.body.id_comision && req.body.id_comision !== "null" ? Number(req.body.id_comision) : null

    // Manejar división y carrera
    if (req.body.division && req.body.carrera && req.body.carrera !== "none") {
      req.body.division = Number(req.body.division)
      req.body.carrera = req.body.carrera
    } else {
      req.body.division = null
      req.body.carrera = null
    }

    const verificacion = await comunicadoUpdateSchema.safeParseAsync(req.body)
    if (!verificacion.success) {
      res.status(400).json({
        respuesta: "Los datos ingresados para actualizar un comunicado son incorrectos: " + verificacion.error.message,
      })
    } else {
      const respuesta = await comunicadoService.actualizarComunicado(
        id_comunicado as string,
        verificacion.data as unknown as comunicadosAttributes
      )
      res.status(respuesta.status).json(respuesta.respuesta)
    }
  }
  eliminar = async (req: Request, res: Response) => {
    const id = req.params.id
    const respuesta = await comunicadoService.eliminarComunicado(id as string)
    res.status(respuesta.status).json(respuesta.respuesta)
  }
}
