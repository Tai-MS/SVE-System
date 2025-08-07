import { Role } from "./UserModel"

type CrearUsuarioDTO = {
    dni: string,
    nombre: string,
    apellido: string,
    estado?: Boolean,
    rol?: Role,
    creado?: Date,
    email?: string
}

export default CrearUsuarioDTO