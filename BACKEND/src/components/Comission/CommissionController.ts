import getErrorMessage from "#Utils/errorHandling"
import { InferCreationAttributes } from "sequelize"
import ComissionService from "./ComissionService"
import { NextFunction, Request, Response } from "express"
import { Comision, ComisionCreation } from "./ComissionModel"
import traerUnaUC  from '#components/CurricularUnit/CurricularUnitService'
import CurricularUnitService from "#components/CurricularUnit/CurricularUnitService"

async function verComisiones(req: Request, res: Response, next: NextFunction){
    try {
        const respuesta = await ComissionService.verComisiones()
        return res.status(200).send(respuesta)
    } catch (error) {
        return res.status(500).json({
        error: "Internal server error",
        message: getErrorMessage(error),
        })
    }
}

async function verComision(req: Request, res: Response, next: NextFunction){
    try {
        const id = req.body.id 
        const respuesta = await ComissionService.verComision(id)
        return res.status(200).send(respuesta)
    } catch (error) {
        return res.status(500).json({
        error: "Internal server error",
        message: getErrorMessage(error),
        })
    }
}

async function crearComision(req: Request, res: Response, next: NextFunction){
    try {
      

      const datos: ComisionCreation  = {
        numero_comision: req.body.numero_comision,
        cupo_maximo: req.body.cupo_maximo,
        activo: req.body.activo
      }
      const crear = await ComissionService.crearComision(datos)
      
      return res.status(200).send(crear)
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
      message: getErrorMessage(error),
    })
  }
}

async function modificarComision(req: Request, res: Response, next: NextFunction){
    try {
      const datos  = {
        id: req.body.id,
        unidad_curricular_id: req.body.unidad_curricular_id ?? null,
        numero_comision: req.body.numero_comision ?? null,
        cupo_maximo: req.body.cupo_maximo ?? null,
        activo: req.body.activo ?? null
      }

      const actualizar = await ComissionService.modificarComision(datos)
    return res.status(200).send(actualizar)
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
      message: getErrorMessage(error),
    })
  }
}

async function añadirAlumnos(req:Request, res: Response, next: NextFunction){
  try {
      const usuarios = []
      for(let i = 0; i < req.body.usuarios.length; i++){
        usuarios.push(req.body.usuario[i])
      }
      const datos  = {
        
      }

      const actualizar = await ComissionService.modificarComision(datos)
    return res.status(200).send(actualizar)
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
      message: getErrorMessage(error),
    })
  }
}

export default {
    verComisiones,
    verComision,
    crearComision,
    modificarComision,
    añadirAlumnos
}