import express, { NextFunction, Request, Response } from "express"
import carreraController from "./CarreraController"

const router = express.Router()
router.get("/traerTodas", carreraController.traerTodas)

router.put("/modificarCarrera", async (req: Request, res: Response, next: NextFunction) => {
    await carreraController.modificarCarrera(req, res, next)
})

export default router