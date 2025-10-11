import Usuario from "#components/User/UserModel";
import UserService from "#components/User/UserService";
import { CalificacionAttributes } from "./CalificacionDTO";
import { Calificacion } from "./CalificationModel";

export class CalificacionServices {
    asignarCalificacion = async (data: CalificacionAttributes) => {
        const t = await Calificacion.sequelize!.transaction()
        try {
            const {alumno_id, nota, comision_uc_id, instancia, fecha, observaciones} = data

            const verificar_alumno = await Usuario.findByPk(alumno_id)

            if(!verificar_alumno){
                return {status: 404, respuesta: "Alumno no encontrado"}
            }

            if(!nota){
                return {status: 204, respuesta: "Se debe asignar una nota."}
            }

            const asignada = await Calificacion.create(data, {transaction: t})
            await t.commit()
            return {status: 203, respuesta: asignada}
        } catch (error: any) {
            return {status: 500, respuesta: error.message || "Error interno al asignar una calificación."}
        }
    }

    modificarCalificacion = async (id: number, data: Partial<CalificacionAttributes>) => {
        const t = await Calificacion.sequelize!.transaction()
        try {
            
            return {status: 203, respuesta: ""}
        } catch (error: any) {
            return {status: 500, respuesta: error.message || "Error interno al modificar una calificación."}
        }
    }

    traerInformacion = async (id: any) => {
        try {
            const informacion = await Calificacion.findByPk(id)
            
            if(!informacion){
                return {status: 404, respuesta: `No se encontro información para el ID ${id}`} 
            }
            return {status: 203, respuesta: informacion}
        } catch (error: any) {
            return {status: 500, respuesta: error.message || "Error interno al buscar una calificación."}
        }
    }
}