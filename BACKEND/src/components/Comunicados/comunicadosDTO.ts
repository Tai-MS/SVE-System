import { archivos } from "#components/Archivos/archivoDTO"
import { usuarioI } from "#components/User/UserDTO"

export type comunicadosAttributes = {
  id?: string
  id_usuario: string
  titulo: string
  descripcion: string
  img?: Array<string>
  pdf?: Array<string>
  eliminado: boolean
  archivos?: archivos
  general?: boolean
  division?: string
  carrera?: string
  id_comision?: number
  creado?: Date
  actualizado?: Date
}

export interface Comunicado {
  id?: string
  id_usuario: string
  titulo: string
  descripcion: string
  eliminado: boolean
  img?: string[]
  general?: boolean
  carrera?: number
  division?: number
  id_comision?: number
  Usuario?: usuarioI
  creado?: string | Date
}
