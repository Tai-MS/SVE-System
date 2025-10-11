import { Router } from "express"
import { CalificacionController } from "./CalificacionController"

export const CalificacionRouter = Router()
const Calificacion = new CalificacionController()

CalificacionRouter.put("/modificar/:id", Calificacion.modificarCalificacion)
CalificacionRouter.post("/asignar", Calificacion.asignarCalificacion)
CalificacionRouter.get("/:id", Calificacion.traerCalificacion)