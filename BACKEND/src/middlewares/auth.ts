import Usuario from "#components/User/UserModel"
import UserService from "#components/User/UserService"
import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

export async function datosDelToken(token: string) {
  const decodificado = jwt.verify(token, clave) as jwt.JwtPayload
  const dni = decodificado.dni
  const rol = decodificado.rol
  const id = decodificado.id
  return { dni: dni, rol: rol, id: id }
}

const clave = process.env.SECRET_KEY || "secreto"
export async function generarToken(data: Usuario) {
  const { dni, nombre, apellido, rol, id } = data

  const token = jwt.sign(
    {
      id: id,
      dni: dni,
      nombre: nombre,
      apellido: apellido,
      rol: rol,
    },
    clave,
    { expiresIn: "1d" }
  )
  return token
}

export async function verificarToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["auth-token"] as string
  if (!token) return res.status(401).send("Accesso denegado")

  try {
    const datosToken = await datosDelToken(token)
    const usuario = await UserService.traerUsuario(datosToken.id)
    if (!usuario) {
      throw Error
    }

    let verificado
    console.log("TOKEN GUARDADO DEL USUARIO" + (usuario as Usuario)["token"])
    console.log("TOKEN GENERADO" + token)
    if (token && (usuario as Usuario)["token"] === token) {
      verificado = jwt.verify(token, clave)
      req.user = verificado
      return next()
    }
    // console.log(token)
    console.log("No entra en la verificacion")

    throw Error
  } catch (error) {
    console.log("ERROR:" + error)

    return res.status(400).send("Token no valido")
  }
}
