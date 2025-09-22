import { InferAttributes, InferCreationAttributes, Model } from "sequelize"

export class Asistencia extends Model<InferAttributes<Asistencia>, InferCreationAttributes<Asistencia>> {
  declare clase_id: number
  declare alumno_id: number
  declare presente: boolean
}
