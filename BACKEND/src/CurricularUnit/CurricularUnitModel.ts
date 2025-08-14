import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize"
import { sequelize } from "../db/connection"

export class UnidadCurricular extends Model<
  InferAttributes<UnidadCurricular>,
  InferCreationAttributes<UnidadCurricular>
> {
  declare id: number
  declare carrera_id: number
  declare nombre: string
  declare carga_horaria: number
  declare tipo_id: number
  declare activo: boolean
}
UnidadCurricular.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    carrera_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    nombre: { type: DataTypes.STRING(200), allowNull: false },
    carga_horaria: { type: DataTypes.SMALLINT.UNSIGNED, allowNull: false },
    tipo_id: { type: DataTypes.TINYINT.UNSIGNED, allowNull: false },
    activo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  },
  {
    sequelize,
    tableName: "unidades_curriculares",
    indexes: [{ unique: true, fields: ["carrera_id", "nombre"] }],
  }
)
