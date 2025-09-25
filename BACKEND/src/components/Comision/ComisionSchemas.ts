import z from "zod"

export const ComisionSchema = z.object({
  id: z.number(),
  numero_comision: z.string(),
  cant_alumnos: z.number(),
  carrera_id: z.string(),
  activo: z.boolean().optional(),
})
