import z from "zod";

export interface Usuario {
  ID: number;
  Nombre: string;
  Carrera: string;
  Año: number;
  Comision: number;
}

export type Usuarios = Usuario[];

export const excelSchema = z.array(
  z.object({
    ID: z.int(),
    Nombre: z.string(),
    Carrera: z.string(),
    Año: z.int(),
    Comision: z.int(),
  })
);
