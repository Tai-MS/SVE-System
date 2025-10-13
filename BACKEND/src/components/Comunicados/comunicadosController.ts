import { ComunicadoService } from "./comunicadosService"
import { Request, Response } from "express"
import { comunicadoSchema } from "./comunicadoSchemas"
import { comunicadosAttributes } from "./comunicadosDTO"

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
  // filtrar = async (req: Request, res: Response) => {
  //   const id_comunicado = req.params.id
  //   const respuesta = await comunicadoService.filtrarComunicado(id_comunicado as string)
  //   res.status(respuesta.status).json(respuesta.respuesta)
  // }

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
    const verificacion = await comunicadoSchema.safeParseAsync(req.body)
    if (!verificacion.success) {
      res.status(400).json({ respuesta: "Los datos ingresados para actualizar un comunicado son incorrectos" })
    } else {
      const respuesta = await comunicadoService.actualizarComunicado(
        id_comunicado as string,
        verificacion.data as unknown as comunicadosAttributes
      )
      res.status(respuesta.status).json(respuesta.respuesta)
    }
  }
  eliminar = async (req: Request, res: Response) => {
    const id_comunicado = req.params.id_comunicado
    const respuesta = await comunicadoService.eliminarComunicado(id_comunicado as string)
    res.status(respuesta.status).json(respuesta.respuesta)
  }
}
