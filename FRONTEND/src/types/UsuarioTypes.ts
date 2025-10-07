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
}

export interface Comunicado {
  id?: string;
  id_usuario: string;
  titulo: string;
  descripcion: string;
  eliminado: boolean;
  img?: string[];
  general?: boolean;
  division?: number;
  id_comision?: string;
  Usuario?: Usuario;
  creado?: string | Date;
}
