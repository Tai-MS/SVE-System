import { Router, Request, Response } from "express"
import { ComunicadoController } from "./comunicadosController"

const comunicadosController = new ComunicadoController()
const comunicadosRouter = Router()

comunicadosRouter.get("/", async (req, res) => await comunicadosController.todosLosComunicados(req, res))
comunicadosRouter.post(
  "/crearComunicado",
  async (req, res) => await comunicadosController.creacionDeComunicado(req, res)
)

export default comunicadosRouter
