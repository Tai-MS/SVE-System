import z from "zod"

export const AsistenciaSchema = z.object({
  clase_id: z.number(),
  alumno_id: z.string(),
  presente: z.boolean(),
})
