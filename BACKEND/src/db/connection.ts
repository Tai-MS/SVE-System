import { Sequelize } from "sequelize-typescript";
import User from '../components/User/UserModel'
import dotenv from 'dotenv'

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

async function initializeDB() {
    try {
        await sequelize.authenticate();
        console.log("DB conectada");
        // await sequelize.sync({ force: true });
        console.log("DB sincronizada");
    } catch (error) {
        console.error("Error en la DB:", error);
    }
}

initializeDB();
export default sequelize;
