import sequelize from '#db/connection'
import { CrearUsuarioDTO, ActualizarUsuarioDTO } from './UserDTO'
import Usuario, { UserCreation } from './UserModel'


class UserClass{
    async traerTodos(): Promise<Usuario[]>{
         return await Usuario.findAll()
    }

    async traerUsuario(dni: string): Promise<Usuario | null>{
        const user= await Usuario.encontrarPorDNI(dni)
           
        return user
    }

    async crearUsuario(datos: UserCreation){
        const crear = await sequelize.transaction(async (t) => {
            return await Usuario.create(datos, { transaction: t });
        });

        return crear;
    }

    async actualizarUsuario(data: ActualizarUsuarioDTO): Promise<Usuario | string>{
            
            const user= await Usuario.encontrarPorDNI(data.dni)
            
            
            if(!user){
                return "Usuario no encontrado"
            }

            Usuario.update(
                {token: data.token}, 
                {where: {dni: data.dni}})
            return user
    }

    async deshabilitarUsuario(){
            return "await User.findByEmail()"
    }
}

const userClass = new UserClass()

export default userClass