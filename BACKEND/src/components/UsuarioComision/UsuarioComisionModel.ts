import { InferAttributes, Model, Optional } from "sequelize"



class UsuarioComision extends Model<InferAttributes<UsuarioComision>>{
    declare id: number
    declare anio: Date
    declare usuario_fk: number
    declare comision_fk: number
}

export default UsuarioComision