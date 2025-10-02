import z from "zod"

export const ComisionSchema = z.object({
  numero_comision: z.string(),
  cant_alumnos: z.number().default(0).optional(),
  carrera_id: z.string(),
  activo: z.boolean().optional(),
  cupo_maximo: z.number().default(60).optional()
})
