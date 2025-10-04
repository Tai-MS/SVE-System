import express, { NextFunction, Request, Response } from "express"
import multer from "multer"
import { datosDelToken, verificarToken } from "#middlewares/auth"
import CommissionController from "./CommissionController"


const router = express.Router()
const upload = multer({ dest: "uploads/" })

router.get('/vercomisiones', CommissionController.verComisiones)

router.get('/vercomision', CommissionController.verComision)

router.post('/crearcomision', CommissionController.crearComision)

router.put('/modificarcomision', CommissionController.modificarComision)

router.put("/añadirAlumnos", CommissionController.añadirAlumnos)

export default router