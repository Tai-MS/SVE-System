import express from "express"
import cors from "cors"
import morgan from "morgan"
import "../db/connection"
import userRouter from "#components/User/UserRoutes"
import passport from "passport"
import session from "express-session"
import connectSessionSequelize from "connect-session-sequelize"
import sequelize from "#db/connection"
import cookieParser from "cookie-parser"
import { verificarToken } from "#middlewares/auth"
import rutasPublicasRouter from '#components/PublicRoutes/rutasPublicas'
import UnidadCurricularRouter from "#components/CurricularUnit/CurricularUnitRoutes"
import CarreraRouter from "#components/Career/CarreraRoutes"
import ComisionRouter from '#components/Comission/ComissionRoute'
import { sessionStore } from "#db/initModels"
/**
 * Se encarga de levantar el servidor
 * y crear las funciones necesarias
 * para la serialización de passport. Así como habilitar cors.
 */
export const create_server = () => {
  const app = express()
  
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use(
      cors({
        origin: true,
        credentials: true,
      })
    )
    .use(cookieParser())
    .use(
      session({
        secret: process.env.SESSION_SECRET || "secret_key",
        store: sessionStore,
        resave: false,
        saveUninitialized: false,
      })
    )
    .use("/public", rutasPublicasRouter) //MODIFICAR ENDPOINTS PARA PRODUCCIÓN
    .use("/carreras", CarreraRouter)
    .use("/unidadcurricular", UnidadCurricularRouter)
    .use("/user", userRouter)
    .use("/comision", ComisionRouter)
    .use(passport.initialize())
    .use(passport.session())
    // .use(verificarToken)

  // Sincronizar el store de sesiones
  sessionStore.sync()

  return app
}
