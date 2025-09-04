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
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    ruta: { type: DataTypes.STRING, allowNull: false },
    modulo: {
      type: DataTypes.ENUM("Comunicado", "Trabajos-Materiales"),
      allowNull: false,
    },
    moduloId: { type: DataTypes.UUID, allowNull: false, defaultValue: DataTypes.UUIDV4 },
  },
  { sequelize, tableName: "archivos", timestamps: true, createdAt: "subido", updatedAt: "actualizado" }
)

export default Archivo
