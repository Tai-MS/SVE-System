import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize"

export enum TipoUC {
  MATERIA = "MATERIA",
  TALLER = "TALLER",
  PRACTICAS_PROF = "PRACTICA PROFESIONALIZANTE",
  LABORATORIO = "LABORATORIO",
}

export class UnidadCurricular extends Model<
  InferAttributes<UnidadCurricular>,
  InferCreationAttributes<UnidadCurricular>
> {
  declare id: string
  declare nombre: string
  declare carga_horaria: number
  declare activo: CreationOptional<boolean>
  declare carrera_id_fk: string
  declare tipo_uc: TipoUC

  static async encontrarPorNombre(nombre: string) {
    return await UnidadCurricular.findOne({
      where: { nombre },
    })
  }
}
