import { CreationOptional, InferAttributes, InferCreationAttributes, Model, Optional } from "sequelize"

export type ComisionCreation = Optional<InferCreationAttributes<Comision>, "id">

export class Comision extends Model<InferAttributes<Comision>, InferCreationAttributes<Comision>> {
  declare id: CreationOptional<number>
  declare numero_comision: string
  declare cupo_maximo: number | null
  declare activo: boolean
  declare cant_alumnos: number
  declare carrera_id: string

  static async encontrarPorNro(numero_comision: number) {
    return await Comision.findOne({
      where: { numero_comision },
    })
  }
}
