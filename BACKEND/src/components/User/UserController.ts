import getErrorMessage from "#Utils/errorHandling"
import { NextFunction, Request, Response } from "express"
import UserService from "./UserService"
import passport from "passport"
import User, { UserCreation } from "./UserModel"
import { CrearUsuarioDTO, DatosBasicos, IniciarSesionDTO } from "./UserDTO"
import { generarContraseña } from "#Utils/generarContraseña"
import { generarToken } from "#middlewares/auth"
import { excelSchema, Usuarios } from "#schemas/userSchemas"
import dotenv from "dotenv"
import XLSX from "xlsx"
import { usuarioI } from "./UserDTO"

dotenv.config()
async function traerTodos(req: Request, res: Response, next: NextFunction): Promise<Response>{
    try {
        const call = await UserService.traerTodos()

    return res.status(200).send(call)
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
      message: getErrorMessage(error),
    })
  }
}

async function traerUsuario(req: Request, res: Response, next: NextFunction): Promise<Response> {
  try {
    const dni: string = req.query.dni as string

    if (!dni) {
      return res.status(400).json({
        error: "Bad request",
        message: "Se requiere el parametro: DNI",
      })
    }

    const usuario = await UserService.traerUsuario(dni)

    if (!usuario) {
      return res.status(204).json({
        message: "Usuario no encontrado",
      })
    }

    return res.status(200).json(usuario)
  } catch (error: unknown) {
    return res.status(500).json({
      error: "Internal server error",
      message: getErrorMessage(error),
    })
  }
}

async function inciarSesion(req: Request, res: Response, next: NextFunction): Promise<Response> {
  try {
    const data = {
      email: req.body.email,
      contraseña: req.body.contraseña,
    }

    if (!data.email || !data.contraseña) {
      return res.status(400).json({
        error: "Bad request",
        message: "Campos incompletos.",
      })
    }

    const iniciar_sesion = await UserService.iniciarSesion(data)
    if (typeof iniciar_sesion === "string") {
      return res.status(400).json({
        error: "Bad request",
        message: iniciar_sesion,
      })
    }

    const token = await generarToken(iniciar_sesion)
    console.log("++++++++++++++++++++++++")
    console.log(token)
    console.log("++++++++++++++++++++++++")
    const usuarioParaActualizar = {
      dni: data.email.split("@")[0],
      token: token
    }
    await UserService.actualizarUsuario(usuarioParaActualizar)

    return res
      .cookie("auth-token", token, {
        maxAge: 360 * 100 * 24,
      })
      .status(200)
      .json({
        status: 200,
        success: true,
        message: "logeado",
        token: token,
      })
  } catch (error: unknown) {
    return res.status(500).json({
      error: "Internal server error",
      message: getErrorMessage(error),
    })
  }
}

async function crearUsuario(req: Request, res: Response, next: NextFunction): Promise<Response> {
  try {
    const contraseña_generada = generarContraseña(10)
    const datos: usuarioI = { ...req.body, [req.body.contraseña]: contraseña_generada }
    const crear = await UserService.crearUsuario(datos)
    if (!crear) {
      return res.status(203).json({
        error: crear,
      })
    }
    return res.status(200).send(crear)
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
      message: getErrorMessage(error),
    })
  }
}

async function actualizarUsuario(req: Request, res: Response, next: NextFunction): Promise<Response> {
  try {
    const email: string = req.query.email as string

    const call = await UserService.traerUsuario(email)

    return res.status(200).send(call)
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
      message: getErrorMessage(error),
    })
  }
}

async function deshabilitarUsuario(req: Request, res: Response, next: NextFunction): Promise<Response> {
  try {
    const email: string = req.query.email as string

    const call = await UserService.traerUsuario(email)

    return res.status(200).send(call)
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
      message: getErrorMessage(error),
    })
  }
}

async function loginGoogle(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  passport.authenticate("google", async (error: unknown, user: User, info: any) => {
    if (error) {
      return next(error)
    }

    if (!user) {
      return res.send("error")
    }

    const token = await generarToken(user)

    req.logIn(user, function (error) {
      if (error) {
        return next(error)
      }
      const email = user.email
      const datos = {
        dni: user.dni,
        email: email,
        token: token,
      }
      UserService.actualizarUsuario(datos)
      return res
        .cookie("auth-token", token, {
          maxAge: 360 * 100 * 24,
        })
        .status(200)
        .json({
          status: 200,
          success: true,
          message: "logeado",
          token: token,
        })
    })
  })(req, res, next)
}

async function ImportarAlumnos(req: Request, res: Response) {
  try {
    // Genera un JSON a partir del archivo .xlsx
    const archivoCasting = (req as unknown as { file: Express.Multer.File }).file
    const archivo = XLSX.readFile(archivoCasting.path)
    const hoja = archivo.Sheets[archivo.SheetNames[0]]
    const datos = XLSX.utils.sheet_to_json(hoja)
    // Verifica con ZOD que los campos del JSON sean correctos
    const verificacion_datos = await excelSchema.safeParseAsync(datos)
    if (!verificacion_datos.success) {
      res.status(400).json({
        respuesta: "Los datos del excel no son compatibles para la importación",
        error: verificacion_datos.error,
      })
    }
    // Envia los registros al Services para subirlos a la DB
    const resultado = await UserService.guardarAlumnosImportados(verificacion_datos.data as Usuarios)
    res.status(resultado.status).json(resultado.mensaje)
  } catch (err) {
    console.log(err)
  }
}

export default {
  traerTodos,
  traerUsuario,
  crearUsuario,
  inciarSesion,
  actualizarUsuario,
  deshabilitarUsuario,
  loginGoogle,
  ImportarAlumnos,
}
