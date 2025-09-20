import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize"
import { sequelize } from "../../db/connection"

export class ComisionAlumno extends Model<InferAttributes<ComisionAlumno>, InferCreationAttributes<ComisionAlumno>> {
  declare comision_id: number
  declare alumno_id: number
  declare fecha_inscripcion: string
}
ComisionAlumno.init(
  {
    comision_id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true },
    alumno_id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true },
    fecha_inscripcion: { type: DataTypes.DATEONLY, allowNull: false, defaultValue: DataTypes.NOW },
  },
  { sequelize, tableName: "comision_alumnos" }
)
