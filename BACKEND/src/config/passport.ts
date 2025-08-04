import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../User/UserModel'
import getErrorMessage, { ErrorResponse } from '../Utils/errorHandling'
import { log } from 'console';


passport.use(
    new GoogleStrategy({
        clientID: process.env.ID_CLIENT_OAUTH || '',
        clientSecret: process.env.SECRET_CLIENT_OAUTH || '',
        callbackURL: `http://localhost:${process.env.PORT}/user/auth/google/callback`
        },
        async function (token: string, tokenSecret: string, profile: passport.Profile, done){
            try {
                
                const email = profile.emails?.[0]?.value
                if(typeof email === 'string'){
                    const user = await User.findByEmail(email)
                    console.log("///////////PASSPORT////////////");
                    console.log(email);
                    console.log("++++++++++++++++++++++");
                    console.log(user);
                    console.log("++++++++++++++++++++++");
                    console.log(user?.dataValues.id);
                    
                    console.log("///////////PASSPORT////////////");
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

passport.serializeUser((user: any, done) => {
    console.log("//////////////serialize//////////////");
    console.log(user);
    console.log("//////////////serialize//////////////");
    
  done(null, user?.dataValues.id);
});

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