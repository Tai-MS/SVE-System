import { generarContraseña } from "#Utils/generarContraseña"
import { hashContraseña } from "#Utils/hashContraseña"
import bcrypt from 'bcrypt';
import  { CrearUsuarioDTO, ActualizarUsuarioDTO, IniciarSesionDTO, DatosBasicos } from "./UserDTO"
import Usuario, { Rol, UserCreation } from "./UserModel"
import userClass from "./UserPersistence"

async function traerTodos(){
        return userClass.traerTodos()
}

async function traerUsuario(dni: string): Promise<Usuario | string>{
        const usuario = await userClass.traerUsuario(dni)
        if(!usuario){
            return `Usuario con el DNI: ${dni} no encontrado`
        }
        
        return usuario
}

async function iniciarSesion(data: IniciarSesionDTO): Promise<Usuario | string>{
    const usuario = await Usuario.encontrarPorEmail(data.email)
    
    if(!usuario){
        return "Email no encontrado"
    }
    const comprar_contraseña = await bcrypt.compare(data.contraseña, usuario.contraseña)
    if(!comprar_contraseña){
        return "Contraseña equivocada"
    }

    return usuario
}

async function crearUsuario(datos: DatosBasicos): Promise<Usuario | string>{
    const {dni, nombre, apellido} = datos

    if(!dni || !nombre || !apellido){
        return "Faltan campos."
    }

    const usuario = await userClass.traerUsuario(dni)

    if(usuario){
        return "Esta persona ya esta registrada"
    }
    const contraseña_generada = generarContraseña()
    const hashear_contraseña = await hashContraseña(contraseña_generada)
    const datosFinal = {
        ...datos,
        contraseña: hashear_contraseña,
        email: dni + "@terciariourquiza.edu.ar",
        activo: true,
        creado: new Date,
        rol: Rol.ESTUDIANTE
    }
    
    const crear = await userClass.crearUsuario(datosFinal)

    return crear
}

async function actualizarUsuario(datos: ActualizarUsuarioDTO): Promise<Usuario | string>{
    const usuario = await userClass.actualizarUsuario(datos)
    return usuario
}

async function deshabilitarUsuario(email: String){
        return email
}

export default {
    traerTodos,
    traerUsuario,
    crearUsuario,
    iniciarSesion,
    actualizarUsuario,
    deshabilitarUsuario
}
