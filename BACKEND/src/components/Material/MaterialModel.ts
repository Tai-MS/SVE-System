import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize"
import { sequelize } from "../../db/connection"

export class Material extends Model<InferAttributes<Material>, InferCreationAttributes<Material>> {
  declare id: number
  declare clase_id: number
  declare titulo: string
  declare url: string | null
  declare descripcion: string | null
}
Material.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    clase_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    titulo: { type: DataTypes.STRING(200), allowNull: false },
    url: { type: DataTypes.STRING(500), allowNull: true },
    descripcion: { type: DataTypes.TEXT, allowNull: true },
  },
  { sequelize, tableName: "materiales" }
)
