import passport from "passport"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import User, { Rol } from "#components/User/UserModel"
import getErrorMessage from "#Utils/errorHandling"
import UserService from "#components/User/UserService"
import { generarContraseña } from "#Utils/generarContraseña"
import { hashContraseña } from "#Utils/hashContraseña"

/**
 * Establece la estrategia de passport
 * para tomar los datos necesarios de la cuenta de Google
 */
console.log(process.env.PORT)
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.ID_CLIENT_OAUTH || "",
      clientSecret: process.env.SECRET_CLIENT_OAUTH || "",
      callbackURL: `http://localhost:${process.env.PORT}/public/auth/google/callback`,
    },
    async function (token: string, tokenSecret: string, profile: passport.Profile, done) {
      console.log(passport)
      console.log(process.env.PORT)
      try {
        //Verifica si el email está en la base de datos
        //Si no esta, verifica si es perteneciente a la institucion
        //(ademas de la verificacion que hace google). Si forma parte, crea su
        //registro en la DB
        const email = profile.emails?.[0]?.value
        const perfil = JSON.parse((profile as any)._raw)
        if (typeof email === "string") {
          const user = await User.encontrarPorEmail(email)
          if (user) {
            return done(null, user)
          } else if (perfil["hd"] === "terciariourquiza.edu.ar" && perfil["email_verified"] === true) {
            const contraseña_generada = generarContraseña()
            const hashear_contraseña = await hashContraseña(contraseña_generada)
            const datos = {
              nombre: perfil["given_name"], 
              apellido: perfil["family_name"], 
              dni: perfil["email"].split("@")[0],
              contraseña: hashear_contraseña,
              telefono: null, 
              email: email, 
              anioIngreso: new Date().getFullYear(), 
              rol: Rol.ESTUDIANTE,
            }
            const crearUsuario = await UserService.crearUsuario(datos)
            // return done(null, false, {message: "Email no registrado"})
            return done(null, crearUsuario)
          } else {
            return done(null, false, { message: "Acceso no autorizado" })
          }
        }
      } catch (error: unknown) {
        return done(getErrorMessage(error))
      }
    }
  )
)

// CORREGIR en passport config:
passport.serializeUser((user: any, done) => {
  console.log(user);
  // ✅ Guardar solo el email para la sesión
  done(null, user.email);
});

passport.deserializeUser(async (email: string, done) => {
  console.log(email);
  try {
    const user = await User.encontrarPorEmail(email);
    done(null, user);
  } catch (error: unknown) {
    const err = getErrorMessage(error);
    done(err);
  }
});

export default passport
