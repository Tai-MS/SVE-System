import { InferAttributes, InferCreationAttributes, Model } from "sequelize"

export class Aula extends Model<InferAttributes<Aula>, InferCreationAttributes<Aula>> {
  declare id: number
  declare nombre: string
  declare activa: boolean
}

