export type archivoAttributes = {
  id?: string
  ruta: string
  modulo: string
  moduloId: string
  subido?: Date
  actualizado?: Date
  material_id?: number
  file_id?: string
  tarea_id?: number
}

export type archivo = {
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  buffer: Buffer
  size: number
}

export type archivos = Array<archivo>

export type archivoValidation = {
  archivo: object
  tipo: string
  modulo: string
  moduloId: string
}
