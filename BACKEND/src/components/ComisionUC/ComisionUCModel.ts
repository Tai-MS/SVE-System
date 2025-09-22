import { InferAttributes, Model } from "sequelize"

export class ComisionUC extends Model<InferAttributes<ComisionUC>>{
    declare id: string
    declare uc_id: string
    declare comision_id: number
}



