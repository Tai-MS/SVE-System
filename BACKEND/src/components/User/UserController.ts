import getErrorMessage from "#Utils/errorHandling"
import { NextFunction, Request, Response } from "express"
import UserService from "./UserService"
import passport from "passport"
import User from "./UserModel"
import { generarContraseña } from "#Utils/generarContraseña"
import { datosDelToken, generarToken } from "#middlewares/auth"
import { excelSchema, Usuarios } from "#components/User/userSchemas"
import dotenv from "dotenv"
import XLSX from "xlsx"
import { usuarioI } from "./UserDTO"
import Usuario from "./UserModel"
import { InferCreationAttributes } from "sequelize"

dotenv.config()
async function traerTodos(req: Request, res: Response, next: NextFunction): Promise<Response> {
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
    const id: string = req.query.id as string

    if (!id) {
      return res.status(400).json({
        error: "Bad request",
        message: "Se requiere el parametro: DNI",
      })
    }

    const usuario = await UserService.traerUsuario(id)

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
    console.log(token)
    const dato = await datosDelToken(token)
  
    const usuarioParaActualizar = {
      dni: data.email.split("@")[0],
      token: token,
    }
    await UserService.actualizarUsuario(usuarioParaActualizar, true)

    return res
      .cookie("auth-token", token, {
        maxAge: 360 * 100 * 24,
      })
      .status(200)
      .json({
        id: dato.id,
        status: 200,
        success: true,
        message: "logeado",
        token: token,
        rol: dato.rol,
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

async function incluirEnUC(req: Request, res: Response, next: NextFunction): Promise<Response> {
  try {
    const token = req.headers["auth-token"] as string | undefined
    const datos = {
      dni: req.body.dni,
      token: token,
      unidad_curricular_id_fk: req.body.unidad_curricular_id_fk || null,
      comision_id: req.body.comision_id || null,
    }

    const call = await UserService.incluirEnUC(datos)

    return res.status(200).send(call)
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
      message: getErrorMessage(error),
    })
  }
}

async function actualizarUsuario(req: Request, res: Response, next: NextFunction): Promise<Response> {
  try {
    const token = req.headers["auth-token"] as string | undefined

    const datos: Partial<InferCreationAttributes<Usuario>> = {
      id: req.body.id,
      dni: req.body.dni,
      email: req.body.email,
      nombre: req.body.nombre || null,
      apellido: req.body.apellido || null,
      telefono: req.body.telefono || null,
      anioIngreso: req.body.anioIngreso || null,
      contraseña: req.body.contraseña || null,
      activo: req.body.activo,
      ultima_conexion: req.body.ultima_conexion || null,
      token: token,
      carrera_id_fk: req.body.carrera_id_fk || null,
    }
    const call = await UserService.actualizarUsuario(datos)

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
    const dato = await datosDelToken(token)
    req.logIn(user, function (error) {
      if (error) {
        return next(error)
      }
      const email = user.email
      const datos = {
        dato: dato.id,
        dni: user.dni,
        email: email,
        token: token,
      }
      UserService.actualizarUsuario(datos, true)
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
  const archivoCasting = (req as unknown as { file?: Express.Multer.File }).file

  if (!archivoCasting || !archivoCasting.buffer) {
    return res.status(400).json({ error: "No se recibió ningún archivo." })
  }

  // Verifica si los usuarios deben ser relacionados con 1 carrera
  //buscando desde el nombre del archivo
  const nombreArchivo = archivoCasting.originalname.toUpperCase()
  const siglas = ["DS", "ITI", "AF"]
  const siglaEncontrada = siglas.find((sigla) => nombreArchivo.includes(`-${sigla}`))

  const archivo = XLSX.read(archivoCasting.buffer, { type: "buffer" })
  const hoja = archivo.Sheets[archivo.SheetNames[0]]
  const datos = XLSX.utils.sheet_to_json(hoja)
  // Verifica con ZOD que los campos del JSON sean correctos
  const verificacion_datos = await excelSchema.safeParseAsync(datos)
  console.log(verificacion_datos);
  
  if (!verificacion_datos.success) {
    res.status(400).json({
      respuesta: "Los datos del excel no son compatibles para la importación",
      error: verificacion_datos.error,
    })
  }
  // Envia los registros al Services para subirlos a la DB
  const resultado = await UserService.guardarAlumnosImportados(verificacion_datos.data as Usuarios, siglaEncontrada)

  res.status(resultado.status).json(resultado.mensaje)
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
  incluirEnUC,
}
