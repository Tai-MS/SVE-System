import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize"
import { sequelize } from "../db/connection"

export class Role extends Model<InferAttributes<Role>, InferCreationAttributes<Role>> {
  declare id: number
  declare nombre: string
}
Role.init(
  {
    id: {
      type: DataTypes.TINYINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: { type: DataTypes.STRING(50), allowNull: false, unique: true },
  },
  { sequelize, tableName: "roles" }
)
