import express, { NextFunction, Request, Response } from "express"
import userController from "./UserController"
import passport from "#config/passport"
import multer from "multer"
import { verificarToken } from "#middlewares/auth"

const router = express.Router()
const upload = multer({ dest: "uploads/" })

/**
 * Endpoint al que debe apuntar el boton de login
 */
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
)

/**
 * Endpoint al que redirecciona "/usuario/google"
 * para tomar los datos de la cuenta
 */
router.get("/auth/google/callback", async (req: Request, res: Response, next: NextFunction) => {
  await userController.loginGoogle(req, res, next)
})

router.get("/obtenerTodos", verificarToken,async (req: Request, res: Response, next: NextFunction) => {
  await userController.traerTodos(req, res, next)
})

router.get("/obtenerUsuario", verificarToken, async (req: Request, res: Response, next: NextFunction) => {
  await userController.traerUsuario(req, res, next)
})

router.post("/crearUsuario", verificarToken, async (req: Request, res: Response, next: NextFunction) => {
  await userController.crearUsuario(req, res, next)
})

router.put("/actualizar/{usuario}", verificarToken, async (req: Request, res: Response, next: NextFunction) => {
  await userController.actualizarUsuario(req, res, next)
})

router.post("/iniciarSesion", async (req: Request, res: Response, next: NextFunction) => {
  await userController.inciarSesion(req, res, next)
})

router.post("/importarAlumnos", upload.single("file"), userController.ImportarAlumnos)

export default router
