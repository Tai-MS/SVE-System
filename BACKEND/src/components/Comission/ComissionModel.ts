import { CreationOptional, InferAttributes, InferCreationAttributes, Model, Optional } from "sequelize"

export type ComisionCreation = Optional<InferCreationAttributes<Comision>, "id">

export class Comision extends Model<InferAttributes<Comision>, InferCreationAttributes<Comision>> {
  declare id: CreationOptional<number>
  declare numero_comision: string
  declare cupo_maximo: number | null
  declare activo: boolean
}

