import { InferAttributes, Model, Optional } from "sequelize"
import { usuarioI } from "./UserDTO"
export enum Rol {
  ESTUDIANTE = "ESTUDIANTE",
  PROFESOR = "PROFESOR",
  BEDELIA = "BEDELIA",
  DIRECTIVO = "DIRECTIVO",
  ADMINISTRADOR = "ADMINISTRADOR",
}

export type UserCreation = Optional<usuarioI, "id">

class Usuario extends Model<InferAttributes<Usuario>, UserCreation> implements usuarioI {
  declare id: string
  declare nombre: string
  declare apellido: string
  declare dni: string
  declare telefono: string
  declare anioIngreso: number
  declare email: string
  declare rol: Rol
  declare contraseña: string
  declare activo: boolean
  declare creado: Date
  declare ultima_conexion: Date
  declare token: string
  declare carrera_id_fk: string

  static async encontrarPorDNI(dni: string) {
    return await Usuario.findOne({
      where: { dni },
    })
  }

  static async encontrarPorEmail(email: string) {
    return await Usuario.findOne({
      where: { email },
    })
  }
}

export default Usuario
