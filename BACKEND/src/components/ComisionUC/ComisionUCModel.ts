import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from "sequelize"

export class ComisionUC extends Model<InferAttributes<ComisionUC>, InferCreationAttributes<ComisionUC>> {
  declare id: CreationOptional<number>  
  declare uc_id: string
  declare comision_id: number
  declare link_meet: CreationOptional<string>
}