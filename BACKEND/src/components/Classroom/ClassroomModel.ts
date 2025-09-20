import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize"
import { sequelize } from "../../db/connection"

export class Aula extends Model<InferAttributes<Aula>, InferCreationAttributes<Aula>> {
  declare id: number
  declare nombre: string
  declare activa: boolean
}
Aula.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    activa: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  },
  { sequelize, tableName: "aulas" }
)
