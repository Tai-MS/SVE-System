import type { Usuario } from "./UsuarioTypes";

export interface Comunicado {
  id?: string;
  id_usuario: string;
  titulo: string;
  descripcion: string;
  eliminado: boolean;
  img?: string[];
  general?: boolean;
  carrera?: number;
  division?: number;
  id_comision?: number;
  Usuario?: Usuario;
  creado?: string | Date;
}

export interface crearComunicado {
  id_usuario: string;
  titulo: string;
  descripcion: string;
  img: File[];
}

export type TIPOS_COMUNICADOS = "none" | "general" | "division" | "comision";

export type TIPOS_CARRERAS = "none" | "ds" | "af" | "iti" | "todas";
