import { UnidadCurricular } from "./CurricularUnitModel"
import getErrorMessage from "#Utils/errorHandling"
import { NextFunction, Request, Response } from "express"
import CurricularUnitService from "./CurricularUnitService"
import { InferCreationAttributes } from "sequelize"

async function traerTodas(req: Request, res: Response, next: NextFunction): Promise<Response> {
  try {
    console.log("sssssssssssssssssssssssssssssssssss")
    const token = (req.headers["token"] as string) || undefined
    console.log(token)
    if (token === undefined) {
      return res.status(304).json("Acceso denegado")
    }
    const respuesta = await CurricularUnitService.traerTodas(token)
    return res.status(200).json(respuesta)
  } catch (error: unknown) {
    return res.status(500).json({
      error: "internal server error",
      message: getErrorMessage(error),
    })
  }
}

async function traerUnaUC(req: Request, res: Response, next: NextFunction): Promise<Response> {
  try {
    const token = req.headers["token"] as string
    const datos = {
      token: token,
      id: req.params.id,
    }
    console.log(token)

    const respuesta = await CurricularUnitService.traerUnaUC(datos)
    return res.status(200).json(respuesta)
  } catch (error: unknown) {
    return res.status(500).json({
      error: "internal server error",
      message: getErrorMessage(error),
    })
  }
}

async function crearUc(req: Request, res: Response, next: NextFunction): Promise<Response> {
  try {
    const datos: InferCreationAttributes<UnidadCurricular> = {
      nombre: req.body.nombre,
      carga_horaria: req.body.carga_horaria,
      activo: req.body.activo,
      carrera_id_fk: req.body.carrera_id_fk,
      tipo_uc: req.body.tipo_uc,
      id: req.body.id + req.body.carrera_id_fk,
    }

    const datos_com_uc = {
      uc_id: datos.id,
      dni_profesor: req.body.dni_profesor,
      nro_comision: req.body.nro_comision,
    }

    const crear = await CurricularUnitService.crearUc(datos, datos_com_uc)

    return res.status(200).send(crear)
  } catch (error: unknown) {
    return res.status(500).json({
      error: "internal server error",
      message: getErrorMessage(error),
    })
  }
}

async function modificarUc(req: Request, res: Response, next: NextFunction): Promise<Response> {
  try {
    const datos = {
      nombre: req.body.nombre || null,
      carga_horaria: req.body.carga_horaria || null,
      activo: req.body.activo || null,
      tipo_uc: req.body.tipo_uc || null,
      carrera_id_fk: req.body.carrera_id_fk || null,
      id: req.body.id,
    }

    const respuesta = await CurricularUnitService.modificarUc(datos)
    return res.status(200).send(respuesta)
  } catch (error: unknown) {
    return res.status(500).json({
      error: "internal server error",
      message: getErrorMessage(error),
    })
  }
}

async function eliminarUc(req: Request, res: Response, next: NextFunction): Promise<Response> {
  try {
    const id = req.body.id
    const respuesta = await CurricularUnitService.eliminarUc(id)
    return res.status(200).send(respuesta)
  } catch (error: unknown) {
    return res.status(500).json({
      error: "internal server error",
      message: getErrorMessage(error),
    })
  }
}

export default {
  traerTodas,
  traerUnaUC,
  crearUc,
  modificarUc,
  eliminarUc,
}
