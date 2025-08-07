import express, { NextFunction, Request, Response } from 'express'
import userController from './UserController'
import passport from '#config/passport'

const router = express.Router()

/**
 * Endpoint al que debe apuntar el boton de login
 */
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login", "email"],
  })
);

/**
 * Endpoint al que redirecciona "/usuario/google" 
 * para tomar los datos de la cuenta
 */
router.get(
  "/auth/google/callback", async(req: Request, res: Response, next: NextFunction) => {
    await userController.loginGoogle(req, res, next)
  }
);

router.get("/obtenerTodos", async(req: Request, res: Response, next: NextFunction) => {
  await userController.traerTodos(req, res, next)
})

router.get("/obtenerUsuario", async(req: Request, res: Response, next: NextFunction) => {
    await userController.traerUsuario(req, res, next)
})

router.post("/crearUsuario", async(req: Request, res: Response, next: NextFunction) => {
    await userController.crearUsuario(req, res, next)
})

router.put("/actualizar/{usuario}", async(req: Request, res: Response, next: NextFunction) => {
  await userController.actualizarUsuario(req, res, next)
})

export default router