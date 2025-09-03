import z from "zod"
import { UsuarioExcel } from "#components/User/UserDTO"

export type Usuarios = UsuarioExcel[]

export const excelSchema = z.array(
  z.object({
    "Apellido y nombre": z.string(),
    Documento: z.string(),
    Teléfono: z.string(),
    Email: z.email(),
    "Año de ingreso": z.int(),
  })
)
