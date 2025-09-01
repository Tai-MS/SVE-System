import z from "zod"

export const comunicadoSchema = z.object({
  id_usuario: z.string(),
  titulo: z.string(),
  descripcion: z.string(),
  archivos: z.string().optional(),
  general: z.boolean().optional(),
  division: z.number().optional(),
  id_comision: z.string().optional(),
})
