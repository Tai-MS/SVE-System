import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize"
import { sequelize } from "../db/connection"

export class UserRole extends Model<InferAttributes<UserRole>, InferCreationAttributes<UserRole>> {
  declare user_id: number
  declare role_id: number
}
UserRole.init(
  {
    user_id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true },
    role_id: { type: DataTypes.TINYINT.UNSIGNED, primaryKey: true },
  },
  { sequelize, tableName: "user_roles" }
)
