import z from 'zod';

export const TareaSchema = z.object({
    estudiante_id: z.string(),
    material_id: z.number(),
})