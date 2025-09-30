import { InferAttributes, Model, Optional } from "sequelize"

class UsuarioComision extends Model<InferAttributes<UsuarioComision>> {
  declare anio_ingreso: Date
  declare usuario_id: string
  declare comision_id: number
}

export default UsuarioComision
