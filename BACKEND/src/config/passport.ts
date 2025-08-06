import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '#components/User/UserModel'
import getErrorMessage from '#Utils/errorHandling'

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
                const email = profile.emails?.[0]?.value
                if(typeof email === 'string'){
                    const user = await User.findByEmail(email)
                    if(user){
                        return done(null, user)
                    }else{
                        return done(null, false, {message: "Email no registrado"})
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
        const user = await User.findByEmail(email);
        done(null, user);
    } catch (error: unknown) {
        const err = getErrorMessage(error)
        done(err);
    }
});

export default passport