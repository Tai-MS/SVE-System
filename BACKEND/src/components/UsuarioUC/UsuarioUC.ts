import { Model, DataTypes } from "sequelize";
import { sequelize } from "#db/connection";

export class UsuarioUnidadCurricular extends Model {
  declare usuario_id: string;
  declare unidad_curricular_id: string;
}

UsuarioUnidadCurricular.init(
  {
    usuario_id: { 
      type: DataTypes.STRING, 
      primaryKey: true, 
      references: { model: "usuarios", key: "id" } 
    },
    unidad_curricular_id: { 
      type: DataTypes.STRING, 
      primaryKey: true, 
      references: { model: "unidad_curricular", key: "id" } 
    },
  },
  {
    sequelize,
    tableName: "usuario_unidad_curricular",
    timestamps: false,
  }
);
export default UsuarioUnidadCurricular
