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

Archivo.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    ruta: { type: DataTypes.STRING, allowNull: false },
    modulo: {
      type: DataTypes.ENUM("Comunicado", "trabajoNoCalificado", "trabajoCalificado", "materialTrabajo"),
      allowNull: false,
    },
    moduloId: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, tableName: "archivos", timestamps: true, createdAt: "subido", updatedAt: "actulizado" }
)

export default Archivo
