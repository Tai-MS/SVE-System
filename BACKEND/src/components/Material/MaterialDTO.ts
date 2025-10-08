import { TipoMaterial } from "./MaterialModel"

export type MaterialAttributes = {
    comision_uc_id: string
    titulo: string
    url: string | null
    descripcion: string | null
    tipo_material: TipoMaterial
}