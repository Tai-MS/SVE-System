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

/**
 * Se encarga de levantar el servidor
 * y crear las funciones necesarias
 * para la serialización de passport. Así como habilitar cors.
 */
export const create_server = () => {
  const app = express()

  const SequelizeStore = connectSessionSequelize(session.Store)
  const sessionStore = new SequelizeStore({
    db: sequelize,
    tableName: "sessions",
    checkExpirationInterval: 15 * 60 * 1000,
    expiration: 24 * 60 * 60 * 1000,
  })

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
    .use(passport.initialize())
    .use(passport.session())
    .use("/user", userRouter)

  sessionStore.sync()

  // Sincronizar el store de sesiones
  sessionStore.sync()

  return app
}
