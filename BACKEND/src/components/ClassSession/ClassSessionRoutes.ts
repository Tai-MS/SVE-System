import { Router } from "express"
import { ClassSessionControllers } from "./ClassSessionController"

export const ClaseSessionRouter = Router()
const ClassSession = new ClassSessionControllers()

ClaseSessionRouter.get("/clase/:id", ClassSession.traerClase)
ClaseSessionRouter.post("/crear", ClassSession.crearClase)
ClaseSessionRouter.put("/modificar", ClassSession.modificarClase)
