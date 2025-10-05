import z from "zod"

export const ClassSessionSchema = z.object({
    comision_uc_id: z.number(),
    profesor_id: z.string(),
    aula_id: z.number(),
    modalidad: z.string(),
    fecha: z.date(),
   hora_inicio: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Formato de hora inválido (HH:MM)"),
  hora_fin: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Formato de hora inválido (HH:MM)"),
    observaciones: z.string()
})





