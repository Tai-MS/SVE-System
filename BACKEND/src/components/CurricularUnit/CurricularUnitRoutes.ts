import express, { NextFunction, Request, Response } from "express"
import CurricularUnitController from "./CurricularUnitController"
import passport from "#config/passport"

const router = express.Router()

router.get("/todas", CurricularUnitController.traerTodas)

router.get("/uc", CurricularUnitController.traerUnaUC)

router.post("/crearUc", CurricularUnitController.crearUc)

router.put("/modificarUc", CurricularUnitController.modificarUc)

router.delete("/eliminaruc", CurricularUnitController.eliminarUc)

export default router
