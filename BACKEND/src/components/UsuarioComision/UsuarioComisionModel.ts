import { CreationOptional, InferAttributes, InferCreationAttributes, Model, Optional } from "sequelize"


class UsuarioComision extends Model<
  InferAttributes<UsuarioComision>,
  InferCreationAttributes<UsuarioComision>
> {
  declare usuario_id: string;
  declare comision_id: number;
  declare anio_comision: Date;
}

export default UsuarioComision