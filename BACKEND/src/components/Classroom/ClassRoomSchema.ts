import z from "zod"

export const ClassRoomSchema = z.object({
    nombre: z.string(),
    activa: z.boolean()
})