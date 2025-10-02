import { Rol } from "./UserModel"

export type CrearUsuarioDTO = {
  dni: string
  nombre: string
  apellido: string
  email: string
  contraseña?: string
  rol?: Rol
  // Optional fields with correct names
  google_id?: string | null
  activo?: boolean
  created_at?: Date
  updated_at?: Date
}

export type DatosBasicos = {
  dni: string
  apellido: string
  contraseña: string
  nombre: string
  telefono: string
}

export type ActualizarUsuarioDTO = {
  dni: string
  contraseña?: string
  nombre?: string
  apellido?: string
  estado?: Boolean
  rol?: Rol
  creado?: Date
  email?: string
  token?: string
  telefono?: string
  anioIngreso?: number
  activo?: boolean
  ultima_conexion?: Date
  carrera_id_fk?: string
}

export type IniciarSesionDTO = {
  email: string
  contraseña: string
}

export type usuarioI = {
  id?: string
  dni: string
  nombre: string
  apellido: string
  email: string
  telefono?: string
  anioIngreso: number
  rol: string
  contraseña: string
  activo?: boolean
  creado?: Date
  ultima_conexion?: Date
  token?: string
}

export type UsuarioExcel = {
  "Apellido y nombre": string
  Documento: string
  Teléfono: string
  Email: string
  "Año de ingreso": number
  numero_comision: number | null
  carrera_id_fk: string | null
}
