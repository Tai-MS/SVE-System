import { TipoUC } from "./CurricularUnitModel"

export type BusquedaUnidadDTO = {
    id?: string
    nombre?: string
}

export type CrearUnidadCurricularDTO = {
    nombre: string
    carga_horaria: number 
    activo?: boolean
    carrera_id_fk: number 
    tipo_uc: TipoUC
}