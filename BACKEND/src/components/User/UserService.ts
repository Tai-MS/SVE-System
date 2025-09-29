import { generarContraseña } from "#Utils/generarContraseña"
import { hashContraseña } from "#Utils/hashContraseña"
import bcrypt from "bcrypt"
import { CrearUsuarioDTO, ActualizarUsuarioDTO, IniciarSesionDTO, DatosBasicos } from "./UserDTO"
import Usuario, { Rol } from "./UserModel"
import userClass from "./UserPersistence"
import { Usuarios } from "#components/User/userSchemas"
import transport from "#Utils/mailer"
import { usuarioI } from "./UserDTO"
import { InferCreationAttributes } from "sequelize"
import { datosDelToken } from "#middlewares/auth"
import { UnidadCurricular } from "#components/CurricularUnit/CurricularUnitModel"
import UsuarioUnidadCurricular from "#components/UsuarioUC/UsuarioUC"
import { sequelize } from "#db/connection"

async function traerTodos() {
  return userClass.traerTodos()
}

async function traerUsuario(dni: string): Promise<Usuario | string> {
  const usuario = await userClass.traerUsuario(dni)
  if (!usuario) {
    return `Usuario con el DNI: ${dni} no encontrado`
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
  const { dni, nombre, apellido } = datos

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
    rol: Rol.ESTUDIANTE,
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

  return crear
}

async function incluirEnUC(datos: any): Promise<Usuario | string> {
  if (typeof datos.token !== "string" || typeof datos.dni !== "string") {
    return "Campos incompatibles"
  }
  const verificarUsuario = await datosDelToken(datos.token)
  if (verificarUsuario.rol === "ESTUDIANTE") {
    return "Acceso denegadp"
  }

  const usuario = await Usuario.findByPk(verificarUsuario.id)

  if (!usuario) {
    return "Alumno no encontrado"
  }

  const lista_UC = datos.unidad_curricular_id_fk
  const uc_no_encontrada = []
  for (let i = 0; i < lista_UC.length; i++) {
    console.log(lista_UC[i])

    const uc = await UnidadCurricular.findByPk(lista_UC[i])
    console.log(uc)

    if (uc) {
      await UsuarioUnidadCurricular.create({ usuario_id: verificarUsuario.id, unidad_curricular_id: lista_UC[i] })
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
  console.log("+++++++++++")
  console.log(datos)
  console.log("+++++++++++")
  const actualizarCampos: Partial<InferCreationAttributes<Usuario>> = {}

  if (guardarToken) {
    actualizarCampos.token = datos.token
    await Usuario.update(actualizarCampos, {
      where: { dni: datos.dni },
    })
    return "token guardado"
  }
  if (dni !== null && dni !== undefined && typeof datos.token === "string") {
    actualizarCampos.dni = datos.dni
  } else {
    return "DNI requerido"
  }
  console.log("/////////////////")

  const confirmarUsuario = await datosDelToken(datos.token)
  console.log("/////////////////")

  console.log(confirmarUsuario)
  console.log(confirmarUsuario.dni)
  console.log(typeof datos.dni)
  console.log(typeof confirmarUsuario.dni)
  console.log("/////////////////")

  console.log(confirmarUsuario.dni !== datos.dni)
  console.log(confirmarUsuario.rol === "ESTUDIANTE")

  if (confirmarUsuario.dni !== datos.dni && confirmarUsuario.rol === "ESTUDIANTE") {
    return "Error"
  }
  const usuario = await Usuario.encontrarPorDNI(dni)

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

async function guardarAlumnosImportados(datos: Usuarios) {
  const t = await Usuario.sequelize!.transaction()
  try {
    // Guardar cada registro en la DB, en caso de tirar algún error hacer rollback
    await sequelize.transaction(async (t) => {
      for (let alumno of datos) {
        const [apellido, nombre] = alumno["Apellido y nombre"].split(",").map((s) => s.trim())
        const dniLimpio = alumno.Documento.replace(/^DNI\s*-\s*/, "")
        const contraseña_generada = generarContraseña()
        const hashear_contraseña = await hashContraseña(contraseña_generada)
        await Usuario.create(
          {
            nombre,
            apellido,
            dni: dniLimpio,
            telefono: alumno.Teléfono,
            email: dniLimpio + "@terciariourquiza.edu.ar",
            anioIngreso: alumno["Año de ingreso"],
            rol: Rol.ESTUDIANTE,
            contraseña: hashear_contraseña,
          },
          { transaction: t }
        )
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
    })
    return { status: 200, mensaje: "Los alumnos se importaron correctamente en la base de datos" }
  } catch (err) {
    console.log("Ocurrio un error a la hora de cargar los alumnos a la base de datos")
    console.log(err)
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
