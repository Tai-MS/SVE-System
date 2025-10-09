import { archivos } from "#components/Archivos/archivoDTO"

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
