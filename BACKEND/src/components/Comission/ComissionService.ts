import { InferCreationAttributes } from 'sequelize'
import { Comision, ComisionCreation } from './ComissionModel'
import CurricularUnitService from '#components/CurricularUnit/CurricularUnitService'
import { UnidadCurricular } from '#components/CurricularUnit/CurricularUnitModel'

async function verComisiones(): Promise<Comision[]>{
    const todas = await Comision.findAll()
    return todas
}

async function verComision(id: string): Promise<Comision | string>{
    const comision = await Comision.findByPk(id)
    if(!comision){
        return "noencontrada"
    }
    return comision
}

async function crearComision(datos: ComisionCreation): Promise<Comision | string | UnidadCurricular | null>{
    
    // console.log("hola");

    //   const unidad_curricular_id = datos.unidad_curricular_id
    //   const uc = await CurricularUnitService.traerUnaUC({id: unidad_curricular_id})
    //   console.log("hola");
    //   console.log(unidad_curricular_id);
    //   console.log(datos);
    //   console.log(uc);
    //   console.log(typeof uc === "string");
    //   console.log(!uc || typeof uc === "string");

    //   if(!uc || typeof uc === "string"){
    //     return uc
    //   }

    const nueva_comision = await Comision.create(datos)
    return nueva_comision
}

async function modificarComision(datos: any): Promise<Comision | string>{
    const id = datos.id

    const comision = await Comision.findByPk(id)

    if(!comision){
        return "noencontrada"
    }

    const datos_actualizar: Partial<InferCreationAttributes<Comision>> = {}

    if(datos.activo !== null){
        datos_actualizar.activo = datos.activo
    }


    if(datos.numero_comision !== null){
        datos_actualizar.numero_comision = datos.numero_comision
    }

    if(datos.cupo_maximo !== null){
        datos_actualizar.cupo_maximo = datos.cupo_maximo
    }

    await Comision.update(datos_actualizar, {
        where: {id: id}
    })

    const comision_actualizada = await Comision.findByPk(id)
    
    return comision_actualizada!
}


export default {
    verComisiones,
    verComision,
    crearComision,
    modificarComision
}