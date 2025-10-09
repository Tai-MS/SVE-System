import { Modalidad } from "./ClassSessionModel"

export type ClassSessionAttributes = {
    id: number
    comision_uc_id: string
    profesor_id: string
    aula_id: number | null
    modalidad: Modalidad
    fecha: Date
    hora_inicio: string 
    hora_fin: string 
    observaciones: string | null

}
