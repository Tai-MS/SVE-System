import { DataTypes, InferAttributes, InferCreationAttributes, Model, Optional } from "sequelize"
import { sequelize } from "../../db/connection"
import { ComisionAttributes } from "./ComisionDTO"
import { Career } from "../Career/CareerModel"

type comisionCreation = Optional<ComisionAttributes, "activo">

export class Comision extends Model<ComisionAttributes, comisionCreation> {
  declare id: number
  declare numero_comision: string
  declare cant_alumnos: number
  declare carrera_id: string
  declare activo: boolean
}
Comision.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    numero_comision: { type: DataTypes.STRING(20), allowNull: false },
    carrera_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "career",
        key: "id",
      },
    },
    cant_alumnos: { type: DataTypes.SMALLINT.UNSIGNED },
    activo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  },
  {
    sequelize,
    tableName: "comisiones",
    indexes: [{ unique: true, fields: ["numero_comision"] }],
  }
)

Comision.belongsTo(Career, { foreignKey: "carrera_id" })
Career.hasMany(Comision, { foreignKey: "carrera_id" })
