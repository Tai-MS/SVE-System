import { DataTypes, InferAttributes, Model, Optional } from "sequelize"
import { sequelize } from "#db/connection"
import { usuarioI } from "./UserDTO"

export enum Rol {
  ESTUDIANTE = "ESTUDIANTE",
  DIRECTIVO = "DIRECTIVO",
  ADMINISTRADOR = "ADMINISTRADOR",
  BEDELIA = "BEDELIA",
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

Usuario.init(
  {
    id: { primaryKey: true, type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
    nombre: { type: DataTypes.STRING(100), allowNull: false },
    apellido: { type: DataTypes.STRING(100), allowNull: false },
    dni: { type: DataTypes.STRING(20), allowNull: false, unique: true },
    telefono: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    anioIngreso: { type: DataTypes.INTEGER, allowNull: false },
    rol: { type: DataTypes.ENUM(...Object.values(Rol)), allowNull: false },
    contraseña: { type: DataTypes.STRING(255), allowNull: false },
    activo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    creado: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    ultima_conexion: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    token: { type: DataTypes.STRING, allowNull: true },
  },
  {
    sequelize,
    tableName: "usuarios",
    timestamps: true,
    createdAt: "creado",
    updatedAt: "ultima_conexion",
    indexes: [
      {
        unique: true,
        fields: ["dni"],
        name: "unique_dni_index",
      },
    ],
  }
)

export default Usuario
