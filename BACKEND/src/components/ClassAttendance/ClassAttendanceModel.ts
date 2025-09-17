import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize"
import { sequelize } from "../../db/connection"

export class Asistencia extends Model<InferAttributes<Asistencia>, InferCreationAttributes<Asistencia>> {
  declare clase_id: number
  declare alumno_id: number
  declare presente: boolean
}
Asistencia.init(
  {
    clase_id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true },
    alumno_id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true },
    presente: { type: DataTypes.BOOLEAN, allowNull: false },
  },
  { sequelize, tableName: "asistencias" }
)
