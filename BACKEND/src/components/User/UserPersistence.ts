import CrearUsuarioDTO from './UserDTO'
import Usuario from './UserModel'


class UserClass{
    async traerTodos(): Promise<Usuario[]>{
         return await Usuario.findAll()
    }

    async traerUsuario(dni: string): Promise<Usuario | null>{
        const user= await Usuario.findByDNI(dni)
           
        return user
    }

    async crearUsuario(datos: CrearUsuarioDTO){
        const crear = await Usuario.create(datos)
        return crear
    }

    async actualizarUsuario(data: Usuario){
            const {dni, nombre, apellido} = data
            const user= await Usuario.findByDNI(dni)
            
            if(!user){
                return "Usuario no encontrado"
            }
    }

    async deshabilitarUsuario(){
            return "await User.findByEmail()"
    }
}

const userClass = new UserClass()

export default userClass