import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from "sequelize"

export enum TipoMaterial{
  TP = "TP",
  TAREA = "TAREA",
  MATERIAL = "MATERIAL"
}

export class Material extends Model<InferAttributes<Material>, InferCreationAttributes<Material>> {
  declare id: CreationOptional<number>
  declare comision_uc_id: string
  declare titulo: string
  declare url: string | null
  declare descripcion: string | null
  declare tipo_material: TipoMaterial
  declare fecha_limite: Date | null
  declare creado: Date
}

