import { Op, WhereOptions } from "sequelize"
import { ComisionAttributes } from "./ComisionDTO"
import { Comision } from "./ComisionModel"
interface ComisionFiltros {
  id?: number
  numero_comision?: string
  carrera_id?: string
  cant_alumnos?: number
  activo?: boolean
}
export class ComisionServices {
  crearComision = async (data: ComisionAttributes) => {
    const t = await Comision.sequelize!.transaction()
    try {
      const comisionDB = await this.buscarComisionQuery({
        numero_comision: data.numero_comision,
        carrera_id: data.carrera_id,
      })
      if (comisionDB.respuesta.length > 0) return { status: 409, respuesta: "La comision que intenta crear ya existe" }
      await Comision.create(data, { transaction: t })
      await t.commit()
      return { status: 201, respuesta: "Comision creada correctamente" }
    } catch (error: any) {
      await t.rollback()
      console.log(error)
      return { status: 500, respuesta: error.msg || "Ocurrio un error en el servidor al intentar crear una comision" }
    }
  }
  buscarComisionQuery = async (filtros: ComisionFiltros) => {
    const where: WhereOptions = {}
    if (filtros.id) {
      where.id = filtros.id
    }
    if (filtros.numero_comision) {
      where.numero_comision = filtros.numero_comision
    }
    if (filtros.carrera_id) {
      where.carrera_id = filtros.carrera_id
    }

    if (filtros.cant_alumnos) {
      where.cant_alumnos = filtros.cant_alumnos
    }

    if (filtros.activo !== undefined) {
      where.activo = filtros.activo
    }

    const comisiones = await Comision.findAll({
      where,
    })
    return { status: 200, respuesta: comisiones }
  }
}
