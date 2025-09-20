import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize"
import { sequelize } from "../../db/connection"

export type Modalidad = "presencial" | "virtual" | "hibrida"

export class Clase extends Model<InferAttributes<Clase>, InferCreationAttributes<Clase>> {
  declare id: number
  declare unidad_curricular_id: number
  declare comision_id: number
  declare profesor_id: number
  declare aula_id: number | null
  declare modalidad: Modalidad
  declare fecha: string
  declare hora_inicio: string
  declare hora_fin: string
  declare observaciones: string | null
}
Clase.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    unidad_curricular_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    comision_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    profesor_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    aula_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true },
    modalidad: { type: DataTypes.ENUM("presencial", "virtual"), allowNull: false },
    fecha: { type: DataTypes.DATEONLY, allowNull: false },
    hora_inicio: { type: DataTypes.TIME, allowNull: false },
    hora_fin: { type: DataTypes.TIME, allowNull: false },
    observaciones: { type: DataTypes.TEXT, allowNull: true },
  },
  {
    sequelize,
    tableName: "clases",
    indexes: [{ fields: ["fecha"] }],
  }
)
