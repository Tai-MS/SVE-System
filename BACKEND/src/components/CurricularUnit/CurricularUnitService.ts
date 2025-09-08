import { object } from 'zod'
import {TipoUC, UnidadCurricular} from './CurricularUnitModel'
import { BusquedaUnidadDTO, CrearUnidadCurricularDTO } from './CurricularUnitDTO'
import { InferCreationAttributes } from 'sequelize'
import { Not } from 'sequelize-typescript'
import { skip } from 'node:test'

async function traerTodas(): Promise<UnidadCurricular[] | null>{
    return await UnidadCurricular.findAll()
}

async function traerUnaUC(unidad: BusquedaUnidadDTO): Promise<UnidadCurricular | string | null>{
    const id = unidad.id
    const nombre = unidad.nombre

    if(id){
        return await UnidadCurricular.findByPk(id)
    }

    if(nombre){
        return await UnidadCurricular.encontrarPorNombre(nombre)
    }

    return "Se requieren parametros de busqueda"

}

async function crearUc(datos: InferCreationAttributes<UnidadCurricular>): Promise<UnidadCurricular | string>{
    const {nombre, carga_horaria, activo, carrera_id_fk, tipo_uc, id} = datos

    if(!nombre || !carga_horaria || !carrera_id_fk || !tipo_uc || !id){
        return "Faltan campos"
    }

    return UnidadCurricular.create(datos)
}

async function modificarUc(datos: InferCreationAttributes<UnidadCurricular>): Promise<UnidadCurricular | string | null>{

    const nuevosCampos: Partial<InferCreationAttributes<UnidadCurricular>> = {}

    if (datos.nombre !== null) {
        nuevosCampos.nombre = datos.nombre
    }
    if (datos.carga_horaria !== null) {
        nuevosCampos.carga_horaria = datos.carga_horaria
    }
    if (datos.activo !== null) {
        nuevosCampos.activo = datos.activo
    }
    if (datos.tipo_uc !== null) {
        nuevosCampos.tipo_uc = datos.tipo_uc
    }

    await UnidadCurricular.update(nuevosCampos, {
        where: { id: datos.id }
    })

    return await traerUnaUC({id: datos.id})
}

async function eliminarUc(id: string): Promise<UnidadCurricular | string | null>{

    const uc = await UnidadCurricular.findByPk(id)

    if(uc){
        await uc.destroy()
        return `La unidad curricular con el ID ${id} ha sido eliminada.`
    }
    return "Unidad curricular no encontrada"
}

export default {
    traerTodas,
    traerUnaUC,
    crearUc,
    modificarUc,
    eliminarUc
}