import sequelize from "#db/connection"
import { DataTypes, Model, Optional } from "sequelize"
import { divisionAttributes } from "./divisionDTO"

type divisionCreation = Optional<divisionAttributes, "id">

export class Division extends Model<divisionAttributes, divisionCreation> {
  declare id: number
  declare fecha_inicio: Date
  declare fecha_fin: Date
}
