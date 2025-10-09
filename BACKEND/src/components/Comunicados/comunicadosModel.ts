import sequelize from "#db/connection"
import { DataTypes, Model, Optional } from "sequelize"
import { comunicadosAttributes } from "./comunicadosDTO"
import Usuario from "#components/User/UserModel"

type comunicadosCreation = Optional<comunicadosAttributes, "id">

class Comunicado extends Model<comunicadosAttributes, comunicadosCreation> {
  declare id: string
  declare id_usuario: string
  declare titulo: string
  declare descripcion: string
  declare eliminado: boolean
  declare general: boolean
  declare division: number
  declare id_comision: number
  declare creado: Date
  declare actualizado: Date
}

// Comunicado.init(
//   {
//     id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
//     id_usuario: {
//       type: DataTypes.UUID,
//       allowNull: false,
//       references: { model: "usuarios", key: "id" },
//       onDelete: "CASCADE",
//       onUpdate: "CASCADE",
//     },
//     titulo: { type: DataTypes.STRING, allowNull: false },
//     descripcion: { type: DataTypes.TEXT, allowNull: false },
//     eliminado: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
//     // UNA VEZ CREADO LOS CAMPOS DE DIVISIONES Y COMISIONES HACER LAS RELACIONES CON DICHAS TABLAS
//     general: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
//     division: { type: DataTypes.INTEGER, allowNull: true, defaultValue: null },
//     id_comision: { type: DataTypes.UUID, allowNull: true, defaultValue: null },
//   },
//   {
//     sequelize,
//     tableName: "comunicados",
//     timestamps: true,
//     createdAt: "creado",
//     updatedAt: "actualizado",
//   }
// )

// Usuario.hasMany(Comunicado, { foreignKey: "id_usuario" })
// Comunicado.belongsTo(Usuario, { foreignKey: "id_usuario" })

export default Comunicado
