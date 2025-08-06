import { NextFunction, Request, Response } from 'express';
import UserService from './UserService'
import passport from 'passport';
import User from './UserModel';
import dotenv from 'dotenv'

dotenv.config()

async function traerTodos(req: Request, res: Response, next: NextFunction){
    try {
        const call = await UserService.traerTodos()

        return res.status(200).send(call)
    } catch (error) {
        res.status(204).send(error)
    }
}

async function traerUsuario(req: Request, res: Response, next: NextFunction){
    try {
        const email: string = req.query.email as string

        const call = await UserService.traerUsuario(email)
    
        res.status(200).send(call)
    } catch (error) {
        res.status(204).send(error)
    }
    
}

async function crearUsuario(req: Request, res: Response, next: NextFunction){
    try {
        const email: string = req.query.email as string

        const call = await UserService.traerUsuario(email)
    
        res.status(200).send(call)
    } catch (error) {
        res.status(204).send(error)
    }
}

async function actualizarUsuario(req: Request, res: Response, next: NextFunction){
    try {
        const email: string = req.query.email as string

        const call = await UserService.traerUsuario(email)
    
        res.status(200).send(call)
    } catch (error) {
        res.status(204).send(error)
    }
}

async function deshabilitarUsuario(req: Request, res: Response, next: NextFunction){
    try {
        const email: string = req.query.email as string

        const call = await UserService.traerUsuario(email)
    
        res.status(200).send(call)
    } catch (error) {
        res.status(204).send(error)
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
            return res.send("logeado");
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
