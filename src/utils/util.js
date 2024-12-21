import bcrypt from "bcrypt";

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (password, user) => bcrypt.compareSync(password, user.password);

















/* import passport from "passport";
import { Strategy } from "passport-jwt";

// Passport configuration

export const pasportCall = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, function (error, user, info){
            if(error){
                return next(error);
            }
            if(!user){
                return res.status(401).send({ error: info.message ? info.message : info.toString() });
            }

            req.user = user;
            next();

        })(req, res, next);
    }
};

export const authorization = (role) =>{
    return async (req, res, next) => {
        if(req.user.role !== role){
            return res.status(403).send({ error: 'Unauthorized' });
        }
        next();
    }
} */

