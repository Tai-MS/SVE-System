import { Op, WhereOptions } from "sequelize"
import { Asistencia } from "./ClassAttendanceModel"
import { AsistenciaAttributes } from "./AsistenciaDTO"

interface AsistenciaFiltros {
  clase_id?: number
  alumno_id?: string
  presente?: boolean
}

export class AsistenciaServices {
  crearAsistencia = async (data: AsistenciaAttributes) => {
    const t = await Asistencia.sequelize!.transaction()
    try {
      const asistenciaDB = await this.buscarAsistenciaQuery({
        clase_id: data.clase_id,
        alumno_id: data.alumno_id,
      })
      if (asistenciaDB.respuesta.length > 0) return { status: 409, respuesta: "La asistencia ya existe" }
      await Asistencia.create(data, { transaction: t })
      await t.commit()
      return { status: 201, respuesta: "Asistencia creada correctamente" }
    } catch (error: any) {
      await t.rollback()
      return { status: 500, respuesta: error.msg || "Ocurrió un error al crear la asistencia" }
    }
  }

  traerTodas = async (clase_id: number) => {
    const asistencias = await Asistencia.findAll({ where: { clase_id } })
    if (asistencias.length > 0) {
      return { status: 200, respuesta: asistencias }
    }
    return { status: 404, respuesta: "No hay asistencias para esta clase." }
  }

  buscarAsistenciaQuery = async (filtros: AsistenciaFiltros) => {
    const where: WhereOptions = {}
    if (filtros.clase_id) where.clase_id = filtros.clase_id
    if (filtros.alumno_id) where.alumno_id = filtros.alumno_id
    if (filtros.presente !== undefined) where.presente = filtros.presente

    const asistencias = await Asistencia.findAll({ where })
    return { status: 200, respuesta: asistencias }
  }

  buscarAsistenciaPorId = async (id: number) => {
    const asistencia = await Asistencia.findByPk(id)
    if (!asistencia) return { status: 404, respuesta: "La asistencia no existe" }
    return { status: 200, respuesta: asistencia }
  }

  modificarAsistencia = async (id: number, newData: AsistenciaAttributes) => {
    const t = await Asistencia.sequelize!.transaction()
    try {
      const asistenciaDB = await Asistencia.findByPk(id)
      if (!asistenciaDB) {
        return { status: 404, respuesta: "La asistencia no existe" }
      }
      let esDiferente = false
      const camposPermitidos = ["clase_id", "alumno_id", "presente"] as const
      for (const key of camposPermitidos) {
        if (newData[key] !== undefined && asistenciaDB[key] !== newData[key]) {
          esDiferente = true
          asistenciaDB.setDataValue(key, newData[key])
        }
      }
      if (!esDiferente) {
        return { status: 409, respuesta: "Los datos de la asistencia no han cambiado" }
      }
      await asistenciaDB.save({ transaction: t })
      await t.commit()
      return { status: 200, respuesta: "Asistencia modificada con éxito" }
    } catch (error) {
      await t.rollback()
      return { status: 500, respuesta: "Ocurrió un error al modificar la asistencia" }
    }
  }

  eliminarAsistencia = async (id: number) => {
    const t = await Asistencia.sequelize!.transaction()
    try {
      const asistenciaDB = await Asistencia.findByPk(id)
      if (!asistenciaDB) {
        return { status: 404, respuesta: "La asistencia no existe" }
      }
      await asistenciaDB.destroy({ transaction: t })
      await t.commit()
      return { status: 200, respuesta: "Asistencia eliminada" }
    } catch (error) {
      await t.rollback()
      return { status: 500, respuesta: "Ocurrió un error al eliminar la asistencia" }
    }
  }
}
