import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize"
import { sequelize } from "../db/connection"

export class Period extends Model<InferAttributes<Period>, InferCreationAttributes<Period>> {
  declare id: number
  declare nombre: string
  declare fecha_inicio: Date
  declare fecha_fin: Date
}
Period.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    fecha_inicio: { type: DataTypes.DATEONLY, allowNull: false },
    fecha_fin: { type: DataTypes.DATEONLY, allowNull: false },
  },
  { sequelize, tableName: "periodos" }
)
