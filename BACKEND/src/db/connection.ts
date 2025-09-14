import { Career } from "#components/Career/CareerModel";
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
        import('#components/User/UserModel');
        import('#components/Period/PeriodModel')
        import('#components/Career/CareerModel')
        import('#components/CurricularUnit/CurricularUnitModel')
        import('#components/UsuarioUC/UsuarioUC')
        /**
         * DESCOMENTAR PARA CREAR O SINCRONIZAR LAS TABLAS
         */
        console.log("hola");
        
        // await sequelize.drop(); // elimina todas las tablas
        console.log("as");
        // await sequelize.sync({ force: true });
        console.log("as");
        
        // cargar() //DESCOMENTAR PARA CREAR CARRERAS
        console.log("DB sincronizada");
    } catch (error: unknown) {
      console.error("Error en initializeDB:", error);
        return {
            error: getErrorMessage(error)
        }
    }
}

export default sequelize;
