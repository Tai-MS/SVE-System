import { cargar } from "#Utils/cargarCarreras";
import { log } from "node:console";
import { Sequelize } from "sequelize"

export const sequelize = new Sequelize(
  process.env.DB_NAME || "svs",
  process.env.DB_USER || "root",
  process.env.DB_PASS || "",
  {
    host: process.env.DB_HOST || "127.0.0.1",
    port: Number(process.env.DB_PORT || 3306),
    dialect: "mysql",
    logging: true,
    define: {
      timestamps: false,
      freezeTableName: true,
    },
  }
)

export const updateDB = async () => {
  try {
    import('#db/initModels')
    await sequelize.sync({ alter: true })
    process.env.PORT === "8080"
      ? console.log("DB local actualizada correctamente!")
      : console.log("DB remota actualizada correctamente!")
  } catch (err) {
    console.log("Error a la hora de actualiza la DB: ", err)
  }
}

export const connectDB = async () => {
  try {
    import('#db/initModels')
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
    import('#db/initModels')

    await sequelize.drop()
    await sequelize.sync({ force: true })
    
    cargar()
    process.env.PORT === "3030"
      ? console.log("DB local reiniciada correctamente!")
      : console.log("DB remota reiniciada correctamente!")
  } catch (err) {
    console.log("Error a la hora de limpiar la DB: ", err)
  }
}
export default sequelize
