import { UnidadCurricular } from "./CurricularUnitModel"
import { BusquedaUnidadDTO } from "./CurricularUnitDTO"
import { InferCreationAttributes, Op } from "sequelize"
import { ComisionUC } from "#components/ComisionUC/ComisionUCModel"
import { Comision } from "#components/Comision/ComisionModel"
import Usuario, { Rol } from "#components/User/UserModel"
import { datosDelToken } from "#middlewares/auth"

async function traerTodas(token: string): Promise<any> {
  const usuario = await datosDelToken(token)

  if (usuario.rol !== Rol.ADMINISTRADOR && usuario.rol !== Rol.BEDELIA && usuario.rol !== Rol.DIRECTIVO) {
    const id = usuario.id

    // Sequelize realiza una serie de inner joins partiendo de Usuario hasta llegar a Comision
    // y limitando los datos que debe traer
    const usuario_con_uc = await Usuario.findByPk(id, {
      attributes: ["id", "nombre", "apellido"],
      include: [
        {
          model: UnidadCurricular,
          attributes: ["id", "nombre"],
          include: [
            {
              model: ComisionUC,
              as: "comisionesUC",
              include: [
                {
                  model: Usuario,
                  as: "profesor",
                  attributes: ["id", "nombre", "apellido"],
                },
                {
                  model: Comision,
                  as: "comision",
                  attributes: ["id", "numero_comision", "cant_alumnos"],
                },
              ],
            },
          ],
        },
      ],
    })

    return usuario_con_uc
  }

  return await UnidadCurricular.findAll({
    attributes: ["id", "nombre"],
    include: [
      {
        model: ComisionUC,
        as: "comisionesUC",
        include: [
          {
            model: Usuario,
            as: "profesor",
            attributes: ["id", "nombre", "apellido"],
          },
          {
            model: Comision,
            as: "comision",
            attributes: ["id", "numero_comision", "cant_alumnos"],
          },
        ],
      },
    ],
  })
}

async function traerUnaUC(unidad: BusquedaUnidadDTO): Promise<UnidadCurricular | string | null> {
  const { id, nombre } = unidad

  let param_busqueda = {}
  if (id) {
    param_busqueda = { id }
  } else if (nombre) {
    param_busqueda = { nombre }
  } else {
    return "Se requieren parametros de busqueda"
  }

  const uc = await UnidadCurricular.findOne({
    where: param_busqueda,
    attributes: ["id", "nombre"],
    include: [
      {
        model: ComisionUC,
        as: "comisionesUC",
        include: [
          {
            model: Usuario,
            as: "profesor",
            attributes: ["id", "nombre", "apellido"],
          },
          {
            model: Comision,
            as: "comision",
            attributes: ["id", "numero_comision", "cant_alumnos"],
          },
        ],
      },
    ],
  })

  if (!uc) return "UC no encontrada"
  return uc
}

async function crearUc(
  datos: InferCreationAttributes<UnidadCurricular>,
  datos_com_uc: any
): Promise<{ uc_creacion: UnidadCurricular; com_uc_creacion: ComisionUC } | string> {
  const { nombre, carga_horaria, activo, carrera_id_fk, tipo_uc, id } = datos
  const { uc_id, dni_profesor, nro_comision } = datos_com_uc

  if (!nombre || !carga_horaria || !carrera_id_fk || !tipo_uc || !id || !uc_id || !dni_profesor || !nro_comision) {
    return "Faltan campos"
  }

  const comision = await Comision.encontrarPorNro(nro_comision.toString())
  if (!comision) {
    return "Comision no encontrada"
  }

  const profesor = await Usuario.encontrarPorDNI(dni_profesor)
  if (!profesor) {
    return "Profesor no encontrado"
  }

  if (profesor!.rol !== "PROFESOR") {
    return "Usuario no válido como profesor"
  }

  const datos_crear_uc_com = {
    uc_id: uc_id,
    profesor_id: profesor!.id,
    comision_id: comision!.id,
  }
  const uc_creacion = await UnidadCurricular.create(datos)
  const com_uc_creacion = await ComisionUC.create(datos_crear_uc_com)
  return { uc_creacion, com_uc_creacion }
}

async function modificarUc(
  datos: InferCreationAttributes<UnidadCurricular>
): Promise<UnidadCurricular | string | null> {
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
    where: { id: datos.id },
  })

  return await traerUnaUC({ id: datos.id })
}

async function eliminarUc(id: string): Promise<UnidadCurricular | string | null> {
  const uc = await UnidadCurricular.findByPk(id)

  if (uc) {
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
  eliminarUc,
}
