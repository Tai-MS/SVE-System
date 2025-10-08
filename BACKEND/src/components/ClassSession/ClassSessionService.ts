import { Aula } from "#components/Classroom/ClassroomModel"
import { ComisionUC } from "#components/ComisionUC/ComisionUCModel"
import Usuario from "#components/User/UserModel"
import { ClassSessionAttributes } from "./ClassSessionDTO"
import { Clase } from "./ClassSessionModel"

export class ClassSessionServices {
  traerClase = async (id: number) => {
    try {
      const clase = await Clase.findByPk(id)
      if(!clase){
        return {status: 404, respuesta: `Clase no encontrada.`}
      }
      return { status: 201, respuesta: clase}
    } catch (error: any) {
      return { status: 500, respuesta: error.msg || "Ocurrio un error en el servidor al intentar traer una clase" }
    }
  }

  validarAulaHorario = async (data: Partial<ClassSessionAttributes>) => {
    const aula = data.aula_id
    if (aula) {
      const salon = await Aula.findByPk(aula)
      if(!salon || salon.activa === false){
        return {
          status: 409,
          respuesta: `Error. El aula ${aula} no está disponible o no existe.`,
        }
      }
      const clases_en_aula = await Clase.encontrarAula(aula, data.fecha!)
      const conflicto = clases_en_aula.some((clase: any) => {
        return data.hora_inicio! < clase.hora_fin && data.hora_fin! > clase.hora_inicio
      })

      if (conflicto) {
        return {
          status: 409,
          respuesta: `Error. El aula ${aula} ya se encuentra ocupada en ese horario.`,
        }
      }
    }
    return false
  }

  validarHorario = async (data: Partial<ClassSessionAttributes>) => {
    if (data.hora_inicio! > data.hora_fin!) {
      return { status: 400, respuesta: "Error en los horarios. La clase no puede terminar antes de empezar" }
    }
    return false
  }

  crearClase = async (data: ClassSessionAttributes) => {
    const t = await Clase.sequelize!.transaction()
    try {
      const dni = data.profesor_id

      //Valida al profesor
      const profesor_id = await Usuario.encontrarPorDNI(dni.toString())
      if (!profesor_id || profesor_id.rol !== "PROFESOR") {
        return { status: 404, respuesta: `Usuario con el DNI: ${dni} no encontrado o no es profesor.` }
      }
      
        const com_existe = await ComisionUC.findByPk(data.comision_uc_id)
        if(!com_existe){
          return { status: 404, respuesta: `La comision no existe.`}
        }

      const aula_disponibilidad = await this.validarAulaHorario(data)
      if(aula_disponibilidad){
        return aula_disponibilidad
      }

      const horario_valido = await this.validarHorario(data)
      if(horario_valido){
        return horario_valido
      }

      const datos_finales: ClassSessionAttributes = {
        ...data,
        profesor_id: profesor_id.id,
      }
      const nueva_clase = await Clase.create(datos_finales, { transaction: t })
      await t.commit()
      return { status: 201, respuesta: nueva_clase }
    } catch (error: any) {
      await t.rollback()
      return { status: 500, respuesta: error.msg || "Ocurrio un error en el servidor al intentar crear una clase" }
    }
  }

  modificarClase = async (data: Partial<ClassSessionAttributes>) => {
    const t = await Clase.sequelize!.transaction()
    try {
      const clase_id = data.id

      const clase = await Clase.findByPk(clase_id)

      if(!clase){
        return {status: 404, respuesta: "Clase no encontrada"}
      }

      const nuevos_datos: Partial<ClassSessionAttributes> = {}

      //Valida al profesor
      const dni = data.profesor_id
      if(dni){
        const profesor = await Usuario.encontrarPorDNI(dni.toString())
        if (!profesor || profesor.rol !== "PROFESOR") {
          return { status: 404, respuesta: `Usuario con el DNI: ${dni} no encontrado o no es profesor.` }
        }
        nuevos_datos.profesor_id = profesor.id
      }

      //Valida comision_uc
      const comision_uc = data.comision_uc_id
      if(comision_uc){
        const com_existe = await ComisionUC.findByPk(comision_uc)
        if(!com_existe){
          return { status: 404, respuesta: `La comision no existe.`}
        }
        nuevos_datos.comision_uc_id = data.comision_uc_id
      }

      if(data.hora_fin && data.hora_inicio){
        const horario_valido = await this.validarHorario(data)
        if(horario_valido){
          return horario_valido
        }
        nuevos_datos.hora_fin = data.hora_fin
        nuevos_datos.hora_inicio = data.hora_inicio
      }
      
      if(data.aula_id && data.fecha){
        const aula_disponible = await this.validarAulaHorario(data)
        if(aula_disponible){
          return aula_disponible
        }
        
        nuevos_datos.aula_id = data.aula_id
        nuevos_datos.fecha = data.fecha
      }

      if(data.observaciones){
        nuevos_datos.observaciones = data.observaciones
      }

      //Verifica si se enviaron datos
      if (Object.keys(nuevos_datos).length === 0) {
        return { status: 400, respuesta: "No se proporcionaron datos para actualizar." }
      }
      
      const actualizacion = await Clase.update(nuevos_datos, {
        where: { id: clase.id },
        transaction: t,
      }) 
      await t.commit()

      return {status: 203, respuesta: `Clase actualizada correctamente. ${actualizacion}`}
    } catch (error: any) {
      await t.rollback()
      return { status: 500, respuesta: error.msg || "Ocurrio un error en el servidor al intentar modificar una clase" }
    }
  }
}
