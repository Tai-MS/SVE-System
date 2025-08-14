import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '#components/User/UserModel'
import getErrorMessage from '#Utils/errorHandling'
import UserService from '#components/User/UserService';
import { generarContraseña } from '#Utils/generarContraseña';

/**
 * Establece la estrategia de passport 
 * para tomar los datos necesarios de la cuenta de Google
 */
passport.use(
    new GoogleStrategy({
        clientID: process.env.ID_CLIENT_OAUTH || '',
        clientSecret: process.env.SECRET_CLIENT_OAUTH || '',
        callbackURL: `http://localhost:${process.env.PORT}/user/auth/google/callback`
        },
        async function (token: string, tokenSecret: string, profile: passport.Profile, done){
            try {
                //Verifica si el email está en la base de datos
                //Si no esta, verifica si es perteneciente a la institucion
                //(ademas de la verificacion que hace google). Si forma parte, crea su
                //registro en la DB
                const email = profile.emails?.[0]?.value
                const perfil = JSON.parse((profile as any)._raw)
                if(typeof email === 'string'){
                    const user = await User.encontrarPorEmail(email)
                    if(user){
                        return done(null, user)
                    }else if(perfil["hd"] === "terciariourquiza.edu.ar" && perfil["email_verified"] === true){
                        const datos = {
                            nombre: perfil["family_name"],
                            apellido: perfil["given_name"],
                            dni: perfil["email"].split("@")[0]
                        }
                        const crearUsuario = await UserService.crearUsuario(datos)
                        // return done(null, false, {message: "Email no registrado"})
                        return done(null, crearUsuario)

                    }else{
                        return done(null, false, {message: "Acceso no autorizado"})
                    }
                }
            } catch (error: unknown) {
                return done(getErrorMessage(error));
            }
        }
    )
)

//Serializa el usuario (guarda ciertos datos de la sesión)
passport.serializeUser((user: any, done) => {
    
  done(null, user?.dataValues.id);
});

//Deserializa el usuario
passport.deserializeUser(async (email: string, done) => {
    try {
        const user = await User.encontrarPorEmail(email);
        done(null, user);
    } catch (error: unknown) {
        const err = getErrorMessage(error)
        done(err);
    }
});

export default passport