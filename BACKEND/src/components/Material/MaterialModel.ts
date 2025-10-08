import { InferAttributes, InferCreationAttributes, Model } from "sequelize"

export enum TipoMaterial{
  TP = "TP",
  TAREA = "TAREA",
  MATERIAL = "MATERIAL"
}

export class Material extends Model<InferAttributes<Material>, InferCreationAttributes<Material>> {
  declare id: number
  declare comision_uc_id: string
  declare titulo: string
  declare url: string | null
  declare descripcion: string | null
  declare tipo_material: TipoMaterial
}

