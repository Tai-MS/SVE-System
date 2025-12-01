import z, { string } from "zod"

const archivo = z.object({
  fieldname: z.string(),
  originalname: z.string(),
  encoding: z.string(),
  mimetype: z.string(),
  buffer: z.instanceof(Buffer),
  size: z.int(),
})

export const comunicadoSchema = z.object({
  id_usuario: z.string(),
  titulo: z.string(),
  descripcion: z.string(),
  archivos: z.array(archivo).optional(),
  general: z.boolean().optional(),
  carrera: z.string().optional(),
  division: z.number().optional(),
  id_comision: z.string().optional(),
})

export const comunicadoUpdateSchema = z.object({
  id_usuario: z.string(),
  titulo: z.string(),
  descripcion: z.string(),
  imagenesExistentes: z.array(z.string()).optional(),
  archivos: z.array(archivo).optional(),
  general: z.boolean().optional(),
  carrera: z.string().nullable().optional(),
  division: z.number().nullable().optional(),
  id_comision: z.string().nullable().optional(),
})
