import { InferAttributes, Model, Optional } from "sequelize"
import { Rol } from "#components/User/UserModel"

export class Profesor extends Model <InferAttributes<Profesor>>{
    declare id: number
    declare nombre: string
    declare apellido: string
    declare tel: number
    declare contraseña: string
    declare estado: boolean
    declare token: string
    declare ultima_conexion: Date
    declare creado: Date
    declare email: string
    declare dni: number
}
