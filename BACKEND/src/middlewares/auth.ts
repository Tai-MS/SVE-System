import Usuario from "#components/User/UserModel"
import UserService from "#components/User/UserService"
import { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken'

const clave = process.env.SECRET_KEY || "secreto"
export async function generarToken(data: Usuario){
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

export async function verificarToken(req: Request, res: Response, next: NextFunction){
    const token = req.cookies['auth-token'];
    if (!token) return res.status(401).send('Accesso denegado');
    
    try {
        console.log('verify', token);
        const decodificado = jwt.verify(token, clave) as jwt.JwtPayload;

        const dni = decodificado.dni;
        
        const usuario = await UserService.traerUsuario(dni)
        
        if(!usuario){
            throw Error; 
        }
        
        let verificado;
        
        if (token && (usuario as Usuario)['token'] === token) {
            console.log('autorizado');
            verificado = jwt.verify(token, clave);
            req.user = verificado;
            console.log('req', req.user);
            return next();
        }
        throw Error;

    } catch (error) {
        return res.status(400).send('Token no valido');
    }
}