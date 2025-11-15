import { NextFunction, Request, Response } from "express"
import carreraService from './CarreraService'
import getErrorMessage from "#Utils/errorHandling"
import { Career } from "./CareerModel"
import { InferAttributes } from "sequelize"

async function traerTodas(req: Request, res: Response, next: NextFunction){
    try {
        const respuesta = await carreraService.traerTodas()
        return res.status(200).send(respuesta)
    } catch (error: unknown) {
        return res.status(500).json({
            error: "Internal server error",
            message: getErrorMessage(error)
        })
    }
}

async function modificarCarrera(req: Request, res: Response, next: NextFunction): Promise<Response>{
    try {
        const {id, nombre, duracion_meses, activo} = req.body
        const datos: InferAttributes<Career> = {
            id: req.body.id,
            nombre: req.body.nombre,
            duracion_meses: req.body.duracion_meses,
            activo: req.body.activo
        }
        const respuesta = await carreraService.modificarCarrera(datos)

        return res.status(200).send(respuesta)
    } catch (error: unknown) {
        return res.status(500).json({
            error: "Internal server error",
            message: getErrorMessage(error)
        })
    }
}

export default {
    traerTodas,
    modificarCarrera
}