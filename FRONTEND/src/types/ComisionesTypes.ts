import type { JSX } from "react/jsx-runtime";

export interface Comision {
  map(arg0: (comision: Comision) => JSX.Element): import("react").ReactNode;
  id: string;
  carrera_id: string;
  division_id: string;
  numero_comision: string;
  cupo_maximo?: number;
  cant_alumnos?: number;
  activo?: boolean;
  anio_creacion?: number;
}

export type Carrera = "AF" | "DS" | "ITI" | "ALL";

export type Division = 1 | 2 | 3;
