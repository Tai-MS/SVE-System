import { ClassSessionAttributes } from "./ClassSessionDTO"
import { Clase } from "./ClassSessionModel"


export class ClassSessionServices{
    traerClase = async() => {
        try {
            
        } catch (error: any) {
            return { status: 500, respuesta: error.msg || "Ocurrio un error en el servidor al intentar crear una comision" } 
        }
    }

    crearClase = async(data: ClassSessionAttributes)=> {
        const t = await Clase.sequelize!.transaction()
        try {

            /**
             * AGREGAR VALIDACIONES:
             *  -PROFESOR
             *  -AULA
             *  -COMISION_UC
             */
            const nueva_clase = await Clase.create(data)
            return {status:201, respuesta:nueva_clase}
        } catch (error: any) {
            return { status: 500, respuesta: error.msg || "Ocurrio un error en el servidor al intentar crear una comision" } 
        }
    }

    modificarClase = async()=> {
        try {
            
        } catch (error: any) {
            return { status: 500, respuesta: error.msg || "Ocurrio un error en el servidor al intentar crear una comision" } 
        }
    }
}