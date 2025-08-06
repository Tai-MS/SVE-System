import User from './UserModel'
import getErrorMessage, { ErrorResponse } from '#Utils/errorHandling'


class UserClass{
    async traerTodos(): Promise<User[] | ErrorResponse>{
        try {
            return await User.findAll()     
        } catch (error: unknown) {
            return {
                error: getErrorMessage(error)
            }
        }
    }

    async traerUsuario(email: string): Promise<User | string | ErrorResponse>{
        try {
            const user= await User.findByEmail(email)
            
            if(!user){
                return "Usuario no encontrado"
            }
            return user
        } catch (error: unknown) {
            return {
                error: getErrorMessage(error)
            }
        }
    }

    async crearUsuario(){
        try {
            return "await User.findByEmail()"
        } catch (error: unknown) {
            return {
                error: getErrorMessage(error)
            }
        }
    }

    async actualizarUsuario(data: User){
        try {
            const {email, nombre, apellido} = data
            const user= await User.findByEmail(email)
            
            if(!user){
                return "Usuario no encontrado"
            }
        } catch (error: unknown) {
            return {
                error: getErrorMessage(error)
            }
        }
    }

    async deshabilitarUsuario(){
        try {
            return "await User.findByEmail()"
        } catch (error: unknown) {
            return {
                error: getErrorMessage(error)
            }
        }
    }
}

const userClass = new UserClass()

export default userClass