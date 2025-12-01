import { Op, Options, WhereOptions } from "sequelize"
import { ComisionAttributes } from "./ComisionDTO"
import { Comision } from "./ComisionModel"
import { ComisionSchema } from "./ComisionSchemas"
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
      console.log(comisionDB)

      if (comisionDB.respuesta.length > 0) return { status: 409, respuesta: "La comision que intenta crear ya existe" }
      const { division_id, cupo_maximo, ...rest } = data
      const comisionData: any = { ...rest, activo: data.activo ?? true }
      if (division_id !== undefined) comisionData.division_id = division_id
      if (cupo_maximo !== undefined) comisionData.cupo_maximo = cupo_maximo
      await Comision.create(comisionData, { transaction: t })
      await t.commit()
      return { status: 201, respuesta: "Comision creada correctamente" }
    } catch (error: any) {
      await t.rollback()
      console.log(error)
      return { status: 500, respuesta: error.msg || "Ocurrio un error en el servidor al intentar crear una comision" }
    }
  }

  traerTodas = async () => {
    const comisiones = await Comision.findAll()

    if (comisiones) {
      return { status: 200, respuesta: comisiones }
    }
    return { status: 404, respuesta: "Esta carrera aún no tiene comisiones." }
  }
/**
 * 
 * Arregla login google
 * Hacer vistas carreras/ucs (hardcodeado)
 * 
 * 
 * mostrar: 
 *  -login google
 *  -importacion alumnos
 *  -subida de archivos/imagenes
 *  -modificacion de algo
 *  -diferentes vistas (admin - profesor - estudiante)
 *  -como se ve la pantalla de materiales siendo admin y estudiante 
 * 
 */
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
  buscarComisionPorId = async (id: number) => {
    const comision = await Comision.findByPk(id)
    if (!comision) return { status: 404, respuesta: "La comision no existe" }
    return { status: 200, respuesta: comision }
  }
  modificarComision = async (id: number, newData: ComisionAttributes) => {
    const t = await Comision.sequelize!.transaction()

    try {
      const comisionDB = await Comision.findByPk(id)
      if (!comisionDB) {
        return { status: 404, respuesta: "La comision no existe" }
      }
      const camposPermitidos = ["numero_comision", "cant_alumnos", "carrera_id", "activo"] as const
      let esDiferente = false
      for (const key of camposPermitidos) {
        if (newData[key as keyof ComisionAttributes] !== undefined) {
          if (comisionDB[key as keyof ComisionAttributes] !== newData[key as keyof ComisionAttributes]) {
            esDiferente = true
            comisionDB.setDataValue(key, newData[key as keyof ComisionAttributes]!)
          }
        }
      }
      if (!esDiferente) {
        return { status: 409, respuesta: "Los datos de la comision no han cambiado" }
      }
      await comisionDB.save({ transaction: t })
      await t.commit()
      return { status: 200, respuesta: "Comision modificada con exito" }
    } catch (error) {
      await t.rollback()
      return { status: 500, respuesta: "Ocurrio un error en el servidor al intentar modificar la comision" }
    }
  }
  eliminarComision = async (id: number) => {
    const t = await Comision.sequelize!.transaction()
    try {
      const comisionDB = await Comision.findByPk(id)
      if (!comisionDB) {
        return { status: 404, respuesta: "La comision no existe" }
      }
      await comisionDB.destroy({ transaction: t })
      await t.commit()
      return { status: 200, respuesta: "Comision eliminada" }
    } catch (error) {
      await t.rollback()
      return { status: 500, respuesta: "Ocurrio un error en el servidor al intentar eliminar la comision" }
    }
  }

  archivarComision = async (id: number) => {
    const t = await Comision.sequelize!.transaction()
    try {
      const comisionDB = await Comision.findByPk(id)
      if (!comisionDB) {
        return { status: 404, respuesta: "La comision no existe" }
      }
      comisionDB.activo = false
      await comisionDB.save({ transaction: t })
      await t.commit()
      return { status: 200, respuesta: "Comision archivada con exito" }
    } catch (error) {
      await t.rollback()
      return { status: 500, respuesta: "Ocurrio un error al intentar archivar la comision" }
    }
  }
}
