import { InferAttributes, InferCreationAttributes, Model } from "sequelize"

export type Modalidad = "presencial" | "virtual" | "hibrida"

export class Clase extends Model<InferAttributes<Clase>, InferCreationAttributes<Clase>> {
  declare id: number
  declare comision_uc_id: string
  declare profesor_id: number
  declare aula_id: number | null
  declare modalidad: Modalidad
  declare fecha: string
  declare hora_inicio: string
  declare hora_fin: string
  declare observaciones: string | null
}
