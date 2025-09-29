import { InferAttributes } from "sequelize"
import { Career } from "./CareerModel"

async function traerTodas(): Promise<Career[]>{
    return Career.findAll()
}

async function traerCarrera(id: string): Promise<Career | string>{
    const carrera = await Career.findOne({
      where: { id: id },
    })

    if(!carrera){
        return "Carrera no encontrada"
    }
    return carrera
}

async function modificarCarrera(datos: any): Promise<string | Career>{
    const carrera = await traerCarrera(datos.id)
    
    const nuevosCampos: Partial<InferAttributes<Career>> = {}
    console.log(Object.keys(nuevosCampos).length);
    
    if (datos.nombre !== null && datos.nombre !== undefined) {
        nuevosCampos.nombre = datos.nombre
    }

    if (datos.duracion_meses !== null && datos.duracion_meses !== undefined) {
        nuevosCampos.duracion_meses = datos.duracion_meses
    }

    if (datos.activo !== null && datos.activo !== undefined) {
        nuevosCampos.activo = datos.activo
    }
    console.log(Object.keys(nuevosCampos).length === 0);
    console.log(Object.keys(nuevosCampos).length === 1);
    console.log(Object.keys(nuevosCampos).length);
    
    if(Object.keys(nuevosCampos).length === 0){
        return "Sin campos para modificar"
    }
    console.log(nuevosCampos);
    
    await Career.update(nuevosCampos, {
        where: { id: datos.id }
    })

    
    return await traerCarrera(datos.id)
}

export default{
    traerTodas,
    modificarCarrera
}