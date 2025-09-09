import z from "zod"

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
  division: z.number().optional(),
  id_comision: z.string().optional(),
})
