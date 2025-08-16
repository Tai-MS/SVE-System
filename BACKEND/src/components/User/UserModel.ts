import { DataTypes, InferAttributes, Model, Optional } from "sequelize"
import { sequelize } from "#db/connection"
import { DataType } from "sequelize-typescript"

export enum Rol{
    ESTUDIANTE = "ESTUDIANTE",
    DIRECTIVO = "DIRECTIVO",
    ADMINISTRADOR = "ADMINISTRADOR",
    BEDELIA = "BEDELIA"
}

export interface UserAttributes {
  id: number
  dni: string
  nombre: string
  apellido: string
  email: string
  rol: string
  contraseña: string
  activo: boolean
  creado: Date
  ultima_conexion?: Date
  token?: string
}
export type UserCreation = Optional<
  UserAttributes,
  "id" 
>

class Usuario extends Model<InferAttributes<Usuario>, UserCreation> implements UserAttributes {
  declare id: number
  declare dni: string
  declare nombre: string
  declare apellido: string
  declare email: string
  declare rol: Rol
  declare contraseña: string 
  declare activo: boolean
  declare creado: Date
  declare ultima_conexion: Date
  declare token: string

  static async encontrarPorDNI(dni: string) {
    return await Usuario.findOne({ 
        where: { dni } 
    });
  }

  static async encontrarPorEmail(email: string) {
    return await Usuario.findOne({ 
        where: { email } 
    });
  }
}

Usuario.init(
  {
    id: {primaryKey: true, type: DataType.UUID, defaultValue: DataType.UUIDV4},
    dni: { type: DataTypes.STRING(20), allowNull: false, unique: true },
    nombre: { type: DataTypes.STRING(100), allowNull: false },
    apellido: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    rol: {type: DataTypes.ENUM(...Object.values(Rol)), allowNull: false},
    contraseña: { type: DataTypes.STRING(255), allowNull: true },
    activo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    creado: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    ultima_conexion: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    token: {type: DataTypes.STRING, allowNull: true}
  },
  {
    sequelize,
    tableName: "usuarios",
    timestamps: true,
    createdAt: "creado",
    updatedAt: "ultima_conexion",
  }
)

export default Usuario