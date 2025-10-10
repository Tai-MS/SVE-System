import z from "zod"

export const CalificacionSchema = z.object({
    comisin_uc_id: z.string(),
    alumno_id: z.string(),
    instancia: z.string(),
    nota: z.string(),
    fecha: z.date(),
    observaciones: z.string().optional().nullable()
})