import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize"
import { sequelize } from "../../db/connection"

export class Comision extends Model<InferAttributes<Comision>, InferCreationAttributes<Comision>> {
  declare id: number
  declare unidad_curricular_id: number
  declare numero_comision: string
  declare cupo_maximo: number | null
  declare activo: boolean
}
Comision.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    unidad_curricular_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    numero_comision: { type: DataTypes.STRING(20), allowNull: false },
    cupo_maximo: { type: DataTypes.SMALLINT.UNSIGNED, allowNull: true },
    activo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  },
  {
    sequelize,
    tableName: "comisiones",
    indexes: [{ unique: true, fields: ["unidad_curricular_id", "numero_comision", "periodo_id"] }],
  }
)
