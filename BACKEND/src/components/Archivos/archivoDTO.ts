export type archivoAttributes = {
  id?: string
  ruta: string
  modulo: string
  moduloId: string
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
