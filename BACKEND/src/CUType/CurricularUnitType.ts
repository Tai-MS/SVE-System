import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize"
import { sequelize } from "../db/connection"

export class CurricularUnitType extends Model<
  InferAttributes<CurricularUnitType>,
  InferCreationAttributes<CurricularUnitType>
> {
  declare id: number
  declare nombre: string
}
CurricularUnitType.init(
  {
    id: {
      type: DataTypes.TINYINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    nombre: { type: DataTypes.STRING(80), allowNull: false, unique: true },
  },
  { sequelize, tableName: "unidad_tipos" }
)
