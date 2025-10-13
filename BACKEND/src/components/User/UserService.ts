import { generarContraseña } from "#Utils/generarContraseña"
import { hashContraseña } from "#Utils/hashContraseña"
import bcrypt from "bcrypt"
import { IniciarSesionDTO, DatosBasicos } from "./UserDTO"
import Usuario, { Rol, UserCreation } from "./UserModel"
import userClass from "./UserPersistence"
import { Usuarios } from "#components/User/userSchemas"
import transport from "#Utils/mailer"
import { usuarioI } from "./UserDTO"
import { InferCreationAttributes, Sequelize } from "sequelize"
import { datosDelToken } from "#middlewares/auth"
import { UnidadCurricular } from "#components/CurricularUnit/CurricularUnitModel"
import UsuarioUnidadCurricular from "#components/UsuarioUC/UsuarioUC"
import sequelize from "#db/connection"
import UsuarioComision from "#components/UsuarioComision/UsuarioComisionModel"
import { Comision } from "#components/Comision/ComisionModel"

async function traerTodos() {
  const usuario = await Usuario.findAll({
  include: [
    {
      model: Comision,
      as: "comisiones", 
      attributes: ["numero_comision", "id"],
      through: {
        attributes: ["anio_comision"], 
      },
    },
  ],
});
  return usuario
}

async function traerUsuario(id: string): Promise<Usuario | string> {
  // const usuario = await userClass.traerUsuario(id)
  const usuario = await Usuario.findOne({
  where: { id },
  include: [
    {
      model: Comision,
      as: "comisiones", 
      attributes: ["numero_comision", "id"],
      through: {
        attributes: ["anio_comision"], 
      },
    },
  ],
});
  if (!usuario) {
    return `Usuario con el ID: ${id} no encontrado`
  }

  return usuario
}

async function iniciarSesion(data: IniciarSesionDTO): Promise<Usuario | string> {
  const usuario = await Usuario.encontrarPorEmail(data.email)

  if (!usuario) {
    return "Email no encontrado"
  }
  const comprar_contraseña = await bcrypt.compare(data.contraseña, usuario.contraseña)

  if (!comprar_contraseña) {
    return "Contraseña equivocada"
  }

  return usuario
}

async function crearUsuario(datos: usuarioI): Promise<Usuario | string> {
  const { dni, nombre, apellido, rol } = datos

  if (!dni || !nombre || !apellido) {
    return "Faltan campos."
  }

  const usuario = await userClass.traerUsuario(dni)

  if (usuario) {
    return "Esta persona ya esta registrada"
  }
  const contraseña_generada = generarContraseña()
  const hashear_contraseña = await hashContraseña(contraseña_generada)
  const datosFinal = {
    ...datos,
    contraseña: hashear_contraseña,
    email: dni + "@terciariourquiza.edu.ar",
    activo: true,
    creado: new Date(),
    rol: rol || Rol.ESTUDIANTE,
  }
  await transport.sendMail({
    from: process.env.USER_MAILER,
    to: dni + "@terciariourquiza.edu.ar",
    subject: "Cuenta creada",
    html: `
    <div>
    <p>Tu contraseña es: ${contraseña_generada}</p>
    </div>
    `,
  })
  const crear = await userClass.crearUsuario(datosFinal)
  if (rol === Rol.ESTUDIANTE) {
    if (datos.comision && datos.anio_comision) {
      await UsuarioComision.create({
        usuario_id: crear.id,
        comision_id: datos.comision,
        anio_comision: datos.anio_comision,
      })
    } else {
      return "Faltan datos para añadir al alumno a su comisión."
    }
  }

  return crear
}

async function incluirEnUC(datos: any): Promise<Usuario | string> {
  if (typeof datos.token !== "string" || typeof datos.dni !== "string") {
    return "Campos incompatibles"
  }
  //Hace referencia al usuario que realiza la accion
  const verificarUsuario = await datosDelToken(datos.token)
  if (verificarUsuario.rol === "ESTUDIANTE" || verificarUsuario.rol === "PROFESOR") {
    return "Acceso denegado"
  }

  //Hace referencia al usuario (alumno) a añadir
  const usuario = await Usuario.encontrarPorDNI(datos.dni)

  if (!usuario) {
    return "Alumno no encontrado"
  }

  const lista_UC = datos.unidad_curricular_id_fk
  const uc_no_encontrada = []
  for (let i = 0; i < lista_UC.length; i++) {
    const uc = await UnidadCurricular.findByPk(lista_UC[i])
    const com = datos.comision_id
    const comision = await Comision.encontrarPorNro(com.toString())

    if (uc && usuario.carrera_id_fk === uc?.carrera_id_fk) {
      await UsuarioUnidadCurricular.create({
        usuario_id: usuario.id,
        unidad_curricular_id: lista_UC[i],
        comision_id: comision!.id,
      })
    } else {
      uc_no_encontrada.push(lista_UC[i])
    }
  }
  if (uc_no_encontrada.length > 0) {
    return `Alumno añadido a las UC. Excepto a: ${uc_no_encontrada}`
  }
  return "Alumno asociado a las UC"
}

async function actualizarUsuario(
  datos: Partial<InferCreationAttributes<Usuario>>,
  guardarToken: boolean = false
): Promise<Usuario | string> {
  const dni = datos.dni
  const actualizarCampos: Partial<InferCreationAttributes<Usuario>> = {}

  if (guardarToken) {
    if (process.env.ENV === "dev") {
      actualizarCampos.token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRjZmEyYzMyLWMxM2QtNGNmMi1hY2I1LTAxYmQ4YjU2ODBiMSIsImRuaSI6IjQ0MDYyODI4Iiwibm9tYnJlIjoiQ0FSTEEgVkVSw5NOSUNBIiwiYXBlbGxpZG8iOiJGRVJOw4FOREVaIiwicm9sIjoiQURNSU5JU1RSQURPUiIsImlhdCI6MTc1OTM1MTIzNSwiZXhwIjoxNzU5NDM3NjM1fQ.hZHbAZQgtuTs5pQACFiOu20YMDTf08DUkInoe6Nth5s"
      await Usuario.update(actualizarCampos, {
        where: { dni: datos.dni },
      })
    } else {
      actualizarCampos.token = datos.token

      await Usuario.update(actualizarCampos, {
        where: { dni: datos.dni },
      })
    }
    return "token guardado"
  }

  if (dni !== null && dni !== undefined && typeof datos.token === "string") {
    actualizarCampos.dni = datos.dni
  } else {
    return "DNI requerido"
  }
  const confirmarUsuario = await datosDelToken(datos.token)

  if (
    confirmarUsuario.rol !== Rol.ADMINISTRADOR &&
    confirmarUsuario.rol !== Rol.BEDELIA &&
    confirmarUsuario.rol !== Rol.DIRECTIVO
  ) {
    return "Error"
  }

  if (datos.email !== null && datos.email !== undefined) {
    actualizarCampos.email = datos.email
  }

  if (datos.nombre !== null && datos.nombre !== undefined) {
    actualizarCampos.nombre = datos.nombre
  }

  if (datos.apellido !== null && datos.apellido !== undefined) {
    actualizarCampos.apellido = datos.apellido
  }

  if (datos.telefono !== null && datos.telefono !== undefined) {
    actualizarCampos.telefono = datos.telefono
  }

  if (datos.anioIngreso !== null && datos.anioIngreso !== undefined) {
    actualizarCampos.anioIngreso = datos.anioIngreso
  }

  if (datos.contraseña !== null && datos.contraseña !== undefined) {
    actualizarCampos.contraseña = datos.contraseña
  }

  if (datos.activo !== null && datos.activo !== undefined) {
    actualizarCampos.activo = datos.activo
  }

  if (datos.ultima_conexion !== null && datos.ultima_conexion !== undefined) {
    actualizarCampos.ultima_conexion = datos.ultima_conexion
  }

  if (datos.token !== null && datos.token !== undefined) {
    actualizarCampos.token = datos.token
  }

  if (datos.carrera_id_fk !== null && datos.carrera_id_fk !== undefined) {
    actualizarCampos.carrera_id_fk = datos.carrera_id_fk
  }

  await Usuario.update(actualizarCampos, {
    where: { dni: datos.dni },
  })

  return "usuario actualizado"
}

async function deshabilitarUsuario(email: String) {
  return email
}

async function guardarAlumnosImportados(datos: Usuarios, carrera: string | null = null) {
  const t = await Usuario.sequelize!.transaction()
  try {
    // Guardar cada registro en la DB, en caso de tirar algún error hacer rollback
    const usuarios_sin_comision: Usuario[] = []
    await sequelize.transaction(async (t) => {
      for (let alumno of datos) {
        const [apellido, nombre] = alumno["Apellido y nombre"].split(",").map((s) => s.trim())
        const dniLimpio = alumno.Documento.replace(/^DNI\s*-\s*/, "")
        const contraseña_generada = generarContraseña()
        const hashear_contraseña = await hashContraseña(contraseña_generada)
        const usuario = await Usuario.create(
          {
            nombre,
            apellido,
            dni: dniLimpio,
            telefono: alumno.Teléfono,
            email: dniLimpio + "@terciariourquiza.edu.ar",
            anioIngreso: alumno["Año de ingreso"],
            rol: Rol.ESTUDIANTE,
            contraseña: hashear_contraseña,
            carrera_id_fk: carrera || null,
          } as UserCreation,
          { transaction: t }
        )
        //Añade al alumno automaticamente a una comision si existe anio_ingreso
        const com = alumno.numero_comision
        const nro_comision = com?.toString()
        if (nro_comision) {
          const comision = await Comision.encontrarPorNro(nro_comision)

          if (comision) {
            await UsuarioComision.create(
              {
                usuario_id: usuario.id,
                comision_id: comision.id,
                anio_comision: new Date(),
              },
              { transaction: t }
            )

            await Comision.update(
              { cant_alumnos: Sequelize.literal("cant_alumnos + 1") },
              {
                where: { numero_comision: nro_comision },
                transaction: t,
              }
            )
          } else {
            usuarios_sin_comision.push(usuario)
          }
        }
        if (process.env.ENV !== "dev") {
          await transport.sendMail({
            from: process.env.USER_MAILER,
            to: dniLimpio + "@terciariourquiza.edu.ar",
            subject: "Cuenta creada",
            html: `
              <div>
                  <p>Tu contraseña es: ${contraseña_generada}</p>
              </div>
          `,
          })
        }
      }
    })

    return { status: 200, mensaje: "Los alumnos se importaron correctamente en la base de datos" }
  } catch (err) {
    t.rollback()
    return { status: 500, respuesta: "Ocurrio un error interno a la hora de guardar los alumnos en la base de datos" }
  }
}

export default {
  traerTodos,
  traerUsuario,
  crearUsuario,
  iniciarSesion,
  actualizarUsuario,
  deshabilitarUsuario,
  guardarAlumnosImportados,
  incluirEnUC,
}
