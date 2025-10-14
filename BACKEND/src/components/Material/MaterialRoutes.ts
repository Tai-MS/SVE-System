import { Router } from "express"
import { MaterialControllers } from "./MaterialController"
import upload from "#Utils/multer"

export const MaterialRouter = Router()
const Material = new MaterialControllers()

MaterialRouter.post("/crear",upload.single("file"), Material.crearMaterial)
MaterialRouter.put("/modificar/:id", Material.modificarMaterial)
MaterialRouter.get("/traerTodos", Material.traerTodosMateriales)
MaterialRouter.get("/:id", Material.traerMaterial)