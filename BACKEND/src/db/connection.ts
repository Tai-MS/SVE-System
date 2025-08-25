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
        import('#components/CUType/CurricularUnitType')
        import('#components/CurricularUnit/CurricularUnitModel')
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

export default sequelize;
