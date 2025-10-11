import { CreationOptional, InferAttributes, InferCreationAttributes, Model, Optional } from "sequelize"

export type ComisionCreation = Optional<InferCreationAttributes<Comision>, "id">

export class Comision extends Model<InferAttributes<Comision>, InferCreationAttributes<Comision>> {
  declare id: CreationOptional<number>
  declare numero_comision: string
  declare cupo_maximo: number | null
  declare activo: boolean
  declare cant_alumnos: number
  declare carrera_id: string
  declare anio_creacion: CreationOptional<number>
  declare division_id: number

  static async encontrarPorNro(numero_comision: string) {
    return await Comision.findOne({
      where: { numero_comision },
    })
  }

  static async encontrarPorCarrera(carrera: string) {
    return await Comision.findAll({
      where: { carrera_id: carrera },
    })
  }
}
