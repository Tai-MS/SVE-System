import CrearUsuarioDTO from "./UserDTO"
import Usuario, { Rol } from "./UserModel"
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

async function crearUsuario(datos: CrearUsuarioDTO){
    const {dni, nombre, apellido} = datos

    if(!dni || !nombre || !apellido){
        return "Faltan campos."
    }

    const usuario = await userClass.traerUsuario(dni)

    if(usuario){
        return "Esta persona ya esta registrada"
    }
    
    const datosFinal = {
        ...datos,
        email: dni + "@terciariourquiza.edu.ar",
        estado: true,
        creado: new Date,
        rol: Rol.ESTUDIANTE
    }
    
    const crear = await userClass.crearUsuario(datosFinal)

    return crear
}

async function actualizarUsuario(email: String){
        return email
}

async function deshabilitarUsuario(email: String){
        return email
}

export default {
    traerTodos,
    traerUsuario,
    crearUsuario,
    actualizarUsuario,
    deshabilitarUsuario
}