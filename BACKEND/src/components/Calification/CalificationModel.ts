import { InferAttributes, InferCreationAttributes, Model } from "sequelize"

export class Calificacion extends Model<InferAttributes<Calificacion>, InferCreationAttributes<Calificacion>> {
  declare id: number
  declare comision_uc_id: string
  declare alumno_id: number
  declare instancia: string
  declare nota: string
  declare fecha: string
  declare observaciones: string | null
  declare material_id_fk: number | null
}
