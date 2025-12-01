import z from 'zod';

export const TareaSchema = z.object({
    estudiante_id: z.string(),
    material_id_fk: z.coerce.number(),
    tarea_id: z.coerce.number().optional().nullable()
})