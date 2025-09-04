import { Router } from "express"
import { ArchivoController } from "./archivoController"

const archivoRouter = Router()
const archivoController = new ArchivoController()

archivoRouter.get("/obtenerUno/:id", async (req, res) => await archivoController.obtenerUno(req, res))
archivoRouter.get(
  "/obtenerPorUsuario/:id_usuario",
  async (req, res) => await archivoController.obtenerPorUsuario(req, res)
)

export default archivoRouter
