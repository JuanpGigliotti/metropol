import passport from "passport";
import jwt from "passport-jwt";

const JWTStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

//cookieextractor
const cookieExtractor = req => {
    let token = null;
    if (req.cookies) {  // Simplificado
        token = req.cookies['cookieToken'];
    }
    return token;
};


const initializePassport = () => {
    passport.use("jwt", new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: process.env.JWT_SECRET,
    }, async (jwt_payload, done) => {
        try {
            console.log('JWT Payload:', jwt_payload);  // Imprimir el payload
            return done(null, jwt_payload);
        } catch (error) {
            return done(error);
        }
    }));
};

export default initializePassport;

