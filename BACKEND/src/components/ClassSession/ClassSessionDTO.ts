import { Modalidad } from "./ClassSessionModel"

export type ClassSessionAttributes = {
    id: number
    comision_uc_id: string
    profesor_id: number
    aula_id: number | null
    modalidad: Modalidad
    fecha: string
    hora_inicio: string 
    hora_fin: string 
    observaciones: string | null

}