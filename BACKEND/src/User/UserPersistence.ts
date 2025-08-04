import User from './UserModel'
import getErrorMessage, { ErrorResponse } from '../Utils/errorHandling'


class UserClass{
    async getAll(): Promise<User[] | ErrorResponse>{
        try {
            return await User.findAll()     
        } catch (error: unknown) {
            return {
                error: getErrorMessage(error)
            }
        }
    }

    async getUser(email: string){
        try {
            return await User.findByEmail(email)
        } catch (error: unknown) {
            return {
                error: getErrorMessage(error)
            }
        }
    }

    async createUser(){
        try {
            return "await User.findByEmail()"
        } catch (error: unknown) {
            return {
                error: getErrorMessage(error)
            }
        }
    }

    async login(email: string){
        try {
            const existingUser = await this.getUser(email)
            if (!existingUser) {
                return 1
            }
            return true
        } catch (error: unknown) {
            return {
                error: getErrorMessage(error)
            }
        }
    }

    async updateUser(){
        try {
            return "await User.findByEmail()"
        } catch (error: unknown) {
            return {
                error: getErrorMessage(error)
            }
        }
    }

    async disableUser(){
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