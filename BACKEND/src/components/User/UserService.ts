import { generarContraseña } from "#Utils/generarContraseña"
import { hashContraseña } from "#Utils/hashContraseña"
import bcrypt from "bcrypt"
import { CrearUsuarioDTO, ActualizarUsuarioDTO, IniciarSesionDTO, DatosBasicos } from "./UserDTO"
import Usuario, { Rol } from "./UserModel"
import userClass from "./UserPersistence"
import { Usuarios } from "#components/User/userSchemas"
import transport from "#Utils/mailer"
import { usuarioI } from "./UserDTO"
import sequelize from "#db/connection"

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

async function actualizarUsuario(datos: ActualizarUsuarioDTO): Promise<Usuario | string> {
  const usuario = await userClass.actualizarUsuario(datos)
  return usuario
}

async function deshabilitarUsuario(email: String) {
  return email
}

async function guardarAlumnosImportados(datos: Usuarios) {
  const t = await Usuario.sequelize!.transaction()
  try {
    // Guardar cada registro en la DB, en caso de tirar algún error hacer rollback
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
        // ANTES DE DESPLEGAR A PRODUCION COLOCAR BIEN ESTA LINEA CON EL MAIL CORRESPONDIENTE (ESTE ES SOLO DE PRUEBA)
        to: dniLimpio + "@terciario.edu.ar",
        subject: "Cuenta creada",
        html: `
          <div>
              <p>Tu contraseña es: ${contraseña_generada}</p>
          </div>
      `,
      })
    }
    t.commit()
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
}
