import { Rol } from "./UserModel"

export type CrearUsuarioDTO = {
    dni: string,
    nombre: string,
    apellido: string,
    contraseña?: string,
    estado?: Boolean,
    rol?: Rol,
    creado?: Date,
    email?: string
}

export type ActualizarUsuarioDTO = {
    dni: string,
    contraseña?: string,
    nombre?: string,
    apellido?: string,
    estado?: Boolean,
    rol?: Rol,
    creado?: Date,
    email?: string,
    token?: string
}

export type IniciarSesionDTO = {
    email: string,
    contraseña: string
}
