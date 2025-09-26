import sequelize from "#db/connection"
import { DataType, DataTypes, Model, Optional } from "sequelize"
import { archivoAttributes } from "./archivoDTO"

type archivoCreation = Optional<archivoAttributes, "id">

class Archivo extends Model<archivoCreation, archivoAttributes> {
  declare id: number
  declare ruta: string
  declare modulo: string
  declare moduloId: number
}



export default Archivo
