import { Router, Request, Response } from "express"
import { ComunicadoController } from "./comunicadosController"
import upload from "#Utils/multer"

const comunicadosController = new ComunicadoController()
const comunicadosRouter = Router()

comunicadosRouter.get("/", async (req, res) => await comunicadosController.obtenerTodos(req, res))
comunicadosRouter.post("/crear", upload.array("img"), async (req, res) => await comunicadosController.crear(req, res))
// comunicadosRouter.get("/obtenerUno/:id", async (req, res) => await comunicadosController.filtrar(req, res))
comunicadosRouter.patch("/actualizar/:id", async (req, res) => await comunicadosController.actualizar(req, res))
comunicadosRouter.patch("/eliminar/:id", async (req, res) => await comunicadosController.eliminar(req, res))
comunicadosRouter.get(
  "/comunicadosfiltro",
  async (req, res) => await comunicadosController.comunicadosPorUsuario(req, res)
)
comunicadosRouter.get(
  "/comunicadosUsuario/:idUser",
  async (req, res) => await comunicadosController.comunicadosDeUnUsuario(req, res)
)
export default comunicadosRouter
