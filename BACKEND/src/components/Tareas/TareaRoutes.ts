import { Router } from "express"
import upload from "#Utils/multer"
import { TareaControllers } from "./TareaController"

export const TareaRouter = Router()
const Tarea = new TareaControllers()

TareaRouter.post("/subir", upload.single("file"), Tarea.subirTarea)
TareaRouter.put("/modificar/:tareaId", upload.single("file"), Tarea.modificarTarea)
TareaRouter.get("/:tareaId", Tarea.traerTarea)
