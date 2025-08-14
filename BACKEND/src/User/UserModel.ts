import { DataTypes, InferAttributes, InferCreationAttributes, Model, Optional } from "sequelize"
import { sequelize } from "../db/connection"

export interface UserAttributes {
  id: number
  dni: string
  nombre: string
  apellido: string
  email: string
  password_hash?: string | null
  google_id?: string | null
  activo: boolean
  created_at?: Date
  updated_at?: Date
}
type UserCreation = Optional<
  UserAttributes,
  "id" | "password_hash" | "google_id" | "activo" | "created_at" | "updated_at"
>

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> implements UserAttributes {
  declare id: number
  declare dni: string
  declare nombre: string
  declare apellido: string
  declare email: string
  declare password_hash: string | null
  declare google_id: string | null
  declare activo: boolean
  declare created_at: Date
  declare updated_at: Date
}

User.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    dni: { type: DataTypes.STRING(20), allowNull: false, unique: true },
    nombre: { type: DataTypes.STRING(100), allowNull: false },
    apellido: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    password_hash: { type: DataTypes.STRING(255), allowNull: true },
    google_id: { type: DataTypes.STRING(100), allowNull: true, unique: true },
    activo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
)
