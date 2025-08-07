import getErrorMessage from '#Utils/errorHandling';
import { NextFunction, Request, Response } from 'express';
import UserService from './UserService'
import passport from 'passport';
import User from './UserModel';
import dotenv from 'dotenv'
import CrearUsuarioDTO from './UserDTO';

dotenv.config()

async function traerTodos(req: Request, res: Response, next: NextFunction){
    try {
        const call = await UserService.traerTodos()

        return res.status(200).send(call)
    } catch (error) {
        return res.status(500).json({
            error: "Internal server error",
            message: getErrorMessage(error)
        })
    }
}

async function traerUsuario(req: Request, res: Response, next: NextFunction): Promise<Response>{
    try {
        const dni: string = req.query.dni as string

        if(!dni){
            return res.status(400).json({
                error: "Bad request",
                message: "Se requiere el parametro: DNI"
            })
        }

        const usuario = await UserService.traerUsuario(dni)
        
        if(!usuario){
            return res.status(204).json({
                message: "Usuario no encontrado"
            })
        }

        return res.status(200).json(usuario)
    } catch (error: unknown) {
        return res.status(500).json({
            error: "Internal server error",
            message: getErrorMessage(error)
        })
    }
    
}

async function crearUsuario(req: Request, res: Response, next: NextFunction){
    try {
        const datos: CrearUsuarioDTO = {
            dni: req.body.dni,
            apellido: req.body.apellido,
            nombre: req.body.nombre
        }
        const crear = await UserService.crearUsuario(datos)
        if(!crear){
            return res.status(203).json({
                error: crear
            })
        }
        res.status(200).send(crear)
    } catch (error) {
        return res.status(500).json({
            error: "Internal server error",
            message: getErrorMessage(error)
        })
    }
}

async function actualizarUsuario(req: Request, res: Response, next: NextFunction){
    try {
        const email: string = req.query.email as string

        const call = await UserService.traerUsuario(email)
    
        res.status(200).send(call)
    } catch (error) {
        return res.status(500).json({
            error: "Internal server error",
            message: getErrorMessage(error)
        })
    }
}

async function deshabilitarUsuario(req: Request, res: Response, next: NextFunction){
    try {
        const email: string = req.query.email as string

        const call = await UserService.traerUsuario(email)
    
        res.status(200).send(call)
    } catch (error) {
        return res.status(500).json({
            error: "Internal server error",
            message: getErrorMessage(error)
        })
    }
}

async function loginGoogle(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('google', async (error: unknown, user: User, info: any) => {
        if (error) {
            return next(error);
        }
        
        if (!user) {
            return res.send("error");
        }
        req.logIn(user, function(error) {
            if (error) {
                return next(error);
            }
            return res.json(user);
        });
    })(req, res, next);
}

export default {
    traerTodos,
    traerUsuario,
    crearUsuario,
    actualizarUsuario,
    deshabilitarUsuario,
    loginGoogle
}
