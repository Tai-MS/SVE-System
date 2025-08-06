import userClass from "./UserPersistence"

async function traerTodos(){
    try {
        return userClass.traerTodos()
    } catch (error) {
        return error
    }
}

async function traerUsuario(email: String){
    try {
        return email
    } catch (error) {
        return error
    }
}

async function crearUsuario(email: String){
    try {
        return email
    } catch (error) {
        return error
    }
}

async function actualizarUsuario(email: String){
    try {
        return email
    } catch (error) {
        return error
    }
}

async function deshabilitarUsuario(email: String){
    try {
        return email
    } catch (error) {
        return error
    }
}

export default {
    traerTodos,
    traerUsuario,
    crearUsuario,
    actualizarUsuario,
    deshabilitarUsuario
}