import { Router } from "express"
import { MaterialControllers } from "./MaterialController"

export const MaterialRouter = Router()
const Material = new MaterialControllers()

MaterialRouter.post("/crear", Material.crearMaterial)
MaterialRouter.put("/modificar/:id", Material.modificarMaterial)
MaterialRouter.get("/traerTodos", Material.traerTodosMateriales)
MaterialRouter.get("/:id", Material.traerMaterial)