import Usuario from "#components/User/UserModel"
import jwt from 'jsonwebtoken'

export async function generarToken(data: Usuario){
    const clave = process.env.SECRET_KEY || "secreto"
    const {dni, nombre, apellido, rol} = data

    const token = jwt.sign({
            dni: dni,
            nombre: nombre, 
            apellido: apellido, 
            rol: rol}, 
            clave, 
            {expiresIn: "1d"})

            
    return token

} 
            