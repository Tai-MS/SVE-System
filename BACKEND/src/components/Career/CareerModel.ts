import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize"
import { sequelize } from "../../db/connection"

export class Career extends Model<InferAttributes<Career>, InferCreationAttributes<Career>> {
  declare id: string
  declare nombre: string
  declare duracion_meses: number
  declare activo: boolean
}
Career.init(
  {
    id: {
      type: DataTypes.STRING,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: { type: DataTypes.STRING(150), allowNull: false, unique: true },
    duracion_meses: { type: DataTypes.SMALLINT.UNSIGNED, allowNull: false },
    activo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  },
  { sequelize, tableName: "carreras" }
)
