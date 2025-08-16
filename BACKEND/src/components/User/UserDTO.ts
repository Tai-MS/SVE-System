import { Rol } from "./UserModel"

export type CrearUsuarioDTO = {
    dni: string,
    nombre: string,
    apellido: string,
    email: string,
    contraseña?: string,
    rol?: Rol,
    // Optional fields with correct names
    google_id?: string | null,
    activo?: boolean,
    created_at?: Date,
    updated_at?: Date
}

export type DatosBasicos = {
    dni: string,
    apellido: string,
    contraseña: string,
    nombre: string
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
