import { object } from 'zod'
import {TipoUC, UnidadCurricular} from './CurricularUnitModel'
import { BusquedaUnidadDTO, CrearUnidadCurricularDTO } from './CurricularUnitDTO'
import { InferCreationAttributes } from 'sequelize'
import { Not } from 'sequelize-typescript'
import { skip } from 'node:test'
import { ComisionUC } from '#components/ComisionUC/ComisionUCModel'
import { Comision } from '#components/Comision/ComisionModel'
import Usuario, { Rol } from '#components/User/UserModel'
import UsuarioUnidadCurricular from '#components/UsuarioUC/UsuarioUC'
import { datosDelToken } from '#middlewares/auth'
import UsuarioComision from '#components/UsuarioComision/UsuarioComisionModel'

/**
 * 
 * hacer q traerTodas y traerUnaUC devuelvan tambien informacion del profesor
 * 
 */
async function traerTodas(token: string): Promise<any>{
    let respuesta
    
    const usuario = await datosDelToken(token)
    if(usuario.rol !== Rol.ADMINISTRADOR && usuario.rol !== Rol.BEDELIA && usuario.rol !== Rol.DIRECTIVO){

        const id = usuario.id

        
        const us_com = await UsuarioUnidadCurricular.findAll({
            where: { usuario_id: id }
        });
        
        const info_profesor = await Usuario.findByPk(id)
        
        respuesta = {
            profesor: info_profesor,
            uc: us_com
        }

        return respuesta
    }
    
    return await UnidadCurricular.findAll()
}

async function traerUnaUC(unidad: BusquedaUnidadDTO): Promise<UnidadCurricular | string | null>{
    const id = unidad.id
    const nombre = unidad.nombre
    
    if(id){
        const uc = await UnidadCurricular.findByPk(id)
    console.log(uc);

        if(uc){
            return uc
        }
        return 'UC no encontrada'
    }

    if(nombre){
        const uc = await UnidadCurricular.findByPk(nombre)

        if(uc){
            return uc
        }
        return 'UC no encontrada'    
    }

    return "Se requieren parametros de busqueda"

}

async function crearUc(datos: InferCreationAttributes<UnidadCurricular>, datos_com_uc:any): Promise<{ uc_creacion: UnidadCurricular; com_uc_creacion: ComisionUC } | string>{
    const {nombre, carga_horaria, activo, carrera_id_fk, tipo_uc, id} = datos
    const { uc_id, dni_profesor, nro_comision} = datos_com_uc

    if(!nombre || !carga_horaria || !carrera_id_fk || !tipo_uc || !id || !uc_id || !dni_profesor || !nro_comision){
        return "Faltan campos"
    }

    const comision = await Comision.encontrarPorNro(nro_comision.toString())
    if(!comision){
        return "Comision no encontrada"
    }

    const profesor = await Usuario.encontrarPorDNI(dni_profesor)
    if(!profesor){
        return "Profesor no encontrado"
    } 

    if(profesor!.rol !== 'PROFESOR'){
        return "Usuario no válido como profesor"
    }

    const datos_crear_uc_com = {
        uc_id: uc_id,
        profesor_id: profesor!.id,
        comision_id: comision!.id
    }
    const uc_creacion = await UnidadCurricular.create(datos)
    const com_uc_creacion = await ComisionUC.create(datos_crear_uc_com)
    return { uc_creacion, com_uc_creacion }
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