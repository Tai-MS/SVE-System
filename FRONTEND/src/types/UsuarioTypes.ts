export type Roles =
  | "ESTUDIANTE"
  | "PROFESOR"
  | "BEDELIA"
  | "DIRECTIVO"
  | "ADMINISTRADOR";

export interface Link {
  name: string;
  path: string;
  rol: Roles;
}

export type Links = Array<Link>;

export interface Usuario {
  id?: string;
  nombre: string;
  apellido: string;
  dni: string;
  telefono?: string;
  email: string;
  anioIngreso: number;
  rol: string;
  contraseña: string;
  activo?: boolean;
  creado?: Date;
  ultima_conexion?: Date;
  token?: string;
  carrera_id_fk: string;
}
