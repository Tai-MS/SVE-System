import sequelize from "#db/connection"
import { DataTypes, Model, Optional } from "sequelize"
import { comunicadosAttributes } from "./comunicadosDTO"
import Usuario from "#components/User/UserModel"

type comunicadosCreation = Optional<comunicadosAttributes, "id">

class Comunicado extends Model<comunicadosAttributes, comunicadosCreation> {
  [x: string]: any
  declare id: string
  declare id_usuario: string
  declare titulo: string
  declare descripcion: string
  declare eliminado: boolean
  declare general: boolean
  declare division: number
  declare carrera: string
  declare id_comision: number
  declare creado: Date
  declare actualizado: Date
}

export default Comunicado
