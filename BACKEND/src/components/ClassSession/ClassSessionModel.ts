import { InferAttributes, InferCreationAttributes, Model } from "sequelize"

export type Modalidad = "presencial" | "virtual" | "hibrida"

export class Clase extends Model<InferAttributes<Clase>, InferCreationAttributes<Clase>> {
  declare id: number
  declare comision_uc_id: string
  declare profesor_id: string
  declare aula_id: number | null
  declare modalidad: Modalidad
  declare fecha: Date
  declare hora_inicio: string
  declare hora_fin: string
  declare observaciones: string | null

  static async encontrarAula(aula_id: number, fecha: Date){
    return await Clase.findAll({
      where: { aula_id: aula_id, fecha: fecha }
    })
  } 

}
