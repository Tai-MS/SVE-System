import { Router } from "express"
import { ComisionControllers } from "./ComisionControllers"

export const ComisionRouter = Router()
const Comision = new ComisionControllers()

ComisionRouter.post("/crear", Comision.crearComision)
ComisionRouter.get("/detalles/:id", Comision.verDetallesComision)
ComisionRouter.patch("/modificar/:id", Comision.modificarComision)
ComisionRouter.delete("/eliminar/:id", Comision.eliminarComision)
ComisionRouter.patch("/archivar/:id", Comision.archivarComision)
ComisionRouter.get("/traerTodas/:carreraID", Comision.traerTodas)
