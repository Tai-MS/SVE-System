import getErrorMessage, { ErrorResponse } from "#Utils/errorHandling"
import dotenv from "dotenv"
dotenv.config()
import { Sequelize } from "sequelize"

export const sequelize = new Sequelize(
  process.env.DB_NAME || "svs",
  process.env.DB_USER || "root",
  process.env.DB_PASS || "",
  {
    host: process.env.DB_HOST || "127.0.0.1",
    port: Number(process.env.DB_PORT),
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
        // await sequelize.sync({ force: true });
        console.log("DB sincronizada");
    } catch (error: unknown) {
        return {
            error: getErrorMessage(error)
        }
    }
}

export const connectDB = async () => {
  try {
    import("#components/User/UserModel")
    import("#components/Period/PeriodModel")
    import("#components/Career/CareerModel")
    import("#components/CUType/CurricularUnitType")
    import("#components/CurricularUnit/CurricularUnitModel")
    import("#components/Archivos/archivosModel")
    import("#components/Comunicados/comunicadosModel")
    await sequelize.sync()
    process.env.PORT === "8080"
      ? console.log("Conectado correctamente a la DB local!")
      : console.log("Conectado correctamente a la DB remota!")
  } catch (err) {
    console.log("Error a la hora de conectar con la DB: ", err)
  }
}

export const clearDB = async () => {
  try {
    import("#components/User/UserModel")
    import("#components/Period/PeriodModel")
    import("#components/Career/CareerModel")
    import("#components/CUType/CurricularUnitType")
    import("#components/CurricularUnit/CurricularUnitModel")
    import("#components/Archivos/archivosModel")
    import("#components/Comunicados/comunicadosModel")
    await sequelize.drop()
    await sequelize.sync({ force: true })
    process.env.PORT === "8080"
      ? console.log("DB local reiniciada correctamente!")
      : console.log("DB remota reiniciada correctamente!")
  } catch (err) {
    console.log("Error a la hora de limpiar la DB: ", err)
  }
}

export default sequelize
