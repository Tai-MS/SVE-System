import { Sequelize } from "sequelize-typescript";
import User from '#components/User/UserModel'
import dotenv from 'dotenv'
import getErrorMessage, { ErrorResponse } from "#Utils/errorHandling";

dotenv.config()

const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    dialect: "mysql",
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    logging: false
})
sequelize.addModels([User])
/**
 * Se conecta a la base de datos MySQL
 */
async function initializeDB(): Promise<void | ErrorResponse> {
    try {
        await sequelize.authenticate();
        console.log("DB conectada");
        /**
         * DESCOMENTAR PARA CREAR O SINCRONIZAR LAS TABLAS
         */
        await sequelize.sync({ force: true });
        console.log("DB sincronizada");
    } catch (error: unknown) {
        return {
            error: getErrorMessage(error)
        }
    }
}

initializeDB();
export default sequelize;
