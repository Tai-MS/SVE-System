import { DataType } from 'sequelize-typescript';
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize"
import { sequelize } from "#db/connection"
import { Career } from "#components/Career/CareerModel"
import { object } from 'zod';

export enum TipoUC {
  MATERIA = "MATERIA",
  TALLER = "TALLER",
  PRACTICAS_PROF = "PRACTICA PROFESIONALIZANTE",
  LABORATORIO = "LABORATORIO"
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

  static async encontrarPorNombre(nombre: string){
    return await UnidadCurricular.findOne({
      where: {nombre}
    })
  }
}
UnidadCurricular.init(
  {
    id: { type: DataTypes.STRING, primaryKey: true },
    nombre: { type: DataTypes.STRING(200), allowNull: false },
    carga_horaria: { type: DataTypes.SMALLINT.UNSIGNED, allowNull: false },
    activo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    tipo_uc: { type: DataTypes.ENUM(...Object.values(TipoUC)), allowNull: false },
    carrera_id_fk: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "carreras",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    }
  },
  {
    sequelize,
    tableName: "unidades_curriculares",
    indexes: [{ unique: true, fields: ["id", "nombre"] }],
  }
)

Career.hasMany(UnidadCurricular, {
  foreignKey: "carrera_id_fk"
});

UnidadCurricular.belongsTo(Career, {
  foreignKey: "carrera_id_fk"
});