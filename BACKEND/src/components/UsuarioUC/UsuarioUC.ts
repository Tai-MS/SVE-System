import { Model } from "sequelize";

export class UsuarioUnidadCurricular extends Model {
  declare usuario_id: string;
  declare unidad_curricular_id: string;
}
export default UsuarioUnidadCurricular
