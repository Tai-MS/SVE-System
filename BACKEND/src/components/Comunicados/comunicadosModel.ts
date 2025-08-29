import sequelize from "#db/connection"
import { DataTypes, Model, Optional } from "sequelize"
import { comunicadosAttributes } from "./comunicadosDTO"
import Usuario from "#components/User/UserModel"

type comunicadosCreation = Optional<comunicadosAttributes, "id">

class Comunicado extends Model<comunicadosAttributes, comunicadosCreation> {
  declare id: number
  declare id_usuario: string
  declare titulo: string
  declare descripcion: string
}

Comunicado.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_usuario: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "usuarios", key: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    titulo: { type: DataTypes.STRING, allowNull: false },
    descripcion: { type: DataTypes.TEXT, allowNull: false },
  },
  {
    sequelize,
    tableName: "comunicados",
    timestamps: true,
    createdAt: "creado",
    updatedAt: "actualizado",
  }
)

Usuario.hasMany(Comunicado, { foreignKey: "id_usuario" })
Comunicado.belongsTo(Usuario, { foreignKey: "id_usuario" })

export default Comunicado
