import express from "express";
import cors from "cors";
import morgan from "morgan";
import "../db/connection";
import userRouter from "../components/User/UserRoutes";
import passport from "passport";
import session from "express-session";
import connectSessionSequelize from "connect-session-sequelize";
import sequelize from "../db/connection"; // Asegúrate de importar tu instancia de Sequelize

export const create_server = () => {
  const app = express();

  // Configuración del store de sesiones con Sequelize
  const SequelizeStore = connectSessionSequelize(session.Store);
  const sessionStore = new SequelizeStore({
    db: sequelize,
    tableName: "sessions",
    checkExpirationInterval: 15 * 60 * 1000, // 15 minutos
    expiration: 24 * 60 * 60 * 1000, // 1 día
  });

  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use(
      cors({
        origin: true, // o especifica tus dominios permitidos
        credentials: true, // importante para sesiones con CORS
      })
    )
    // El middleware de sesión debe ir ANTES de passport
    .use(
      session({
        secret: process.env.SESSION_SECRET || "secret_key", // Usa variable de entorno en producción
        store: sessionStore,
        resave: false,
        saveUninitialized: false,
        cookie: {
          secure: process.env.NODE_ENV === "production", // HTTPS en producción
          maxAge: 24 * 60 * 60 * 1000, // 1 día
          httpOnly: true, // Seguridad adicional
        },
      })
    )
    .use(passport.initialize())
    .use(passport.session())
    .use("/user", userRouter);

  // Sincronizar el store de sesiones
  sessionStore.sync();

  return app;
};
