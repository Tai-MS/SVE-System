import type { Usuario } from "./UsuarioTypes";

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
