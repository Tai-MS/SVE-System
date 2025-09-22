import { cargar } from "#Utils/cargarCarreras";
import getErrorMessage, { ErrorResponse } from "#Utils/errorHandling";
import { Sequelize } from "sequelize"

export const sequelize = new Sequelize(
  process.env.DB_NAME || "svs",
  process.env.DB_USER || "root",
  process.env.DB_PASS || "",
  {
    host: process.env.DB_HOST || "127.0.0.1",
    port: Number(process.env.DB_PORT || 3306),
    dialect: "mysql",
    logging: false,
    define: {
      timestamps: false,
      freezeTableName: true,
    },
  }
)

export async function initializeDB(): Promise<void | ErrorResponse> {
    try {
        await sequelize.authenticate();
        console.log("DB conectada");
        
        import('#db/initModels')
        /**
          await sequelize.sync({ alter: true });
          */
        await sequelize.drop(); // elimina todas las tablas
        await sequelize.sync({ force: true }); 
        cargar() //DESCOMENTAR PARA CREAR CARRERAS
        console.log("DB sincronizada");
    } catch (error: unknown) {
      console.error("Error en initializeDB:", error);
        return {
            error: getErrorMessage(error)
        }
    }
}

export default sequelize;
