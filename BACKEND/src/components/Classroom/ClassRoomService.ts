import { ClassRoomAttributes } from "./ClassRoomDTO"
import { Aula } from "./ClassroomModel"


export class ClassRoomServices {
    crearAula = async (datos: ClassRoomAttributes) => {
        const t = await Aula.sequelize!.transaction()
        try {
            const nombre = datos.nombre
            const aula = await Aula.encontrarPorNombre(nombre)

            if(aula){
                return { status: 203, respuesta: `El aula con el nombre ${nombre} ya existe.`}
            }

            const aula_creada = await Aula.create(datos)
            await t.commit()
            return { status: 201, respuesta: aula_creada}

        } catch (error: any) {
            await t.rollback()
            return { status: 500, respuesta: error.msg || "Ocurrio un error en el servidor al intentar crear un aula"}
        }
    }

    modificarAula = async (datos: Partial<ClassRoomAttributes>) => {
        const t = await Aula.sequelize!.transaction()
        try {
            const aula = await Aula.findByPk(datos.id)
            if(!aula){
                return {status: 204, respuesta: `Aula no encontrada`}
            }
            console.log(datos.activa);
            
            const nuevos_datos: Partial<ClassRoomAttributes> = {}
            if(datos.activa !== undefined){
                nuevos_datos.activa = datos.activa
            }

            if(datos.nombre){
                nuevos_datos.nombre = datos.nombre
            }

            if (Object.keys(nuevos_datos).length === 0) {
                return { status: 400, respuesta: "No se proporcionaron datos para actualizar." }
            }

            const actualizacion = await Aula.update(nuevos_datos, {
                where: { id: aula.id },
                transaction: t,
            }) 
            await t.commit()
            
            return {status: 203, respuesta: `Clase actualizada correctamente. ${actualizacion}`}
        } catch (error: any) {
            await t.rollback()
            return { status: 500, respuesta: error.msg || "Ocurrio un error en el servidor al intentar modificar un aula"}
        }
    }

    traerAula = async(id?: number, nombre?: string) => {
        try {
            let aula
            if(id){
                aula = await Aula.findByPk(id)
            }else if(nombre){
                aula = await Aula.encontrarPorNombre(nombre)
            }else{
                return { status: 400, respuesta: "Debe proporcionar un id o un nombre." }
            }

            if(!aula){
                return {status: 204, respuesta: `Aula no encontrada`}
            }

            return {status: 200, respuesta: aula}
        } catch (error: any) {
            return { status: 500, respuesta: error.msg || "Ocurrio un error en el servidor al intentar traer un aula"}
        }
    }
}