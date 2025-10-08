import z from 'zod';
import { TipoMaterial } from './MaterialModel';

export const MaterialSchema = z.object({
  comision_uc_id: z.string(),
  titulo: z.string(),
  url: z.string().optional().nullable(),
  descripcion: z.string().optional().nullable(),
  tipo_material: z.enum([...Object.values(TipoMaterial)] as [string, ...string[]]),
});