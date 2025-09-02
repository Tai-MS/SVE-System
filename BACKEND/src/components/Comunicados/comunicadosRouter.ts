import { Router, Request, Response } from "express"
import { ComunicadoController } from "./comunicadosController"

const comunicadosController = new ComunicadoController()
const comunicadosRouter = Router()

comunicadosRouter.get("/", async (req, res) => await comunicadosController.todosLosComunicados(req, res))
comunicadosRouter.post(
  "/crearComunicado",
  async (req, res) => await comunicadosController.creacionDeComunicado(req, res)
)
comunicadosRouter.get(
  "/mirarComunicado/:id",
  async (req, res) => await comunicadosController.obtenerUnComunicado(req, res)
)

export default comunicadosRouter
