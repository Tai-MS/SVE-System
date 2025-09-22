import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize"
import { sequelize } from "#db/connection"

export class Calificacion extends Model<InferAttributes<Calificacion>, InferCreationAttributes<Calificacion>> {
  declare id: number
  declare comision_id: number
  declare alumno_id: number
  declare instancia: string
  declare nota: string
  declare fecha: string
  declare observaciones: string | null
}
// Calificacion.init(
//   {
//     id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
//     comision_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
//     alumno_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
//     instancia: { type: DataTypes.STRING(100), allowNull: false }, //osea, TP, parcial, trabajo en clase, etc.
//     nota: { type: DataTypes.DECIMAL(5, 2), allowNull: false },
//     fecha: { type: DataTypes.DATEONLY, allowNull: false, defaultValue: DataTypes.NOW },
//     observaciones: { type: DataTypes.STRING(255), allowNull: true },
//   },
//   {
//     sequelize,
//     tableName: "calificaciones",
//     indexes: [{ unique: true, fields: ["comision_id", "alumno_id", "instancia"] }],
//   }
// )
