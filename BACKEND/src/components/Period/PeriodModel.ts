import { InferAttributes, InferCreationAttributes, Model } from "sequelize"

export class Period extends Model<InferAttributes<Period>, InferCreationAttributes<Period>> {
  declare id: number
  declare nombre: string
  declare fecha_inicio: Date
  declare fecha_fin: Date
}
