import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize"
import { sequelize } from "#db/connection"

export class Career extends Model<InferAttributes<Career>, InferCreationAttributes<Career>> {
  declare id: string
  declare nombre: string
  declare duracion_meses: number
  declare activo: boolean
}
