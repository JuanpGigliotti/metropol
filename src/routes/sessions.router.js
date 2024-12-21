import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import {createHash, isValidPassword} from "../utils/util.js";
import userModel from "../models/users.model.js";

const router = Router();



//register
router.post("/register", async (req, res) => {
    const {user, password} = req.body;

    try {
        
        const existeUsuario = await userModel.findOne({user});

        if (existeUsuario) {
            return res.status(400).json({message: "El nombre de usuario ya existe"});
        }


        const newUser = new userModel({
            user,
            password: createHash(password),
        });

        await newUser.save();


        const token = jwt.sign({user: newUser.user, rol:newUser.rol}, "metropol",{expiresIn: "1h"});

        res.cookie("cookieToken", token, {
            maxAge:33600000,
            httpOnly:true
        })

        res.redirect("/api/sessions/current");

    } catch (error) {
        res.status(500).send("error token generate");
    }
})

//login

router.post("/login", async (req, res) => {
    const {user, password} = req.body;

    try {
    
        const userFinded = await userModel.findOne({user});

        if(!userFinded){
            return res.status(401).send("wrong password");
        }

        if(!isValidPassword(password, userFinded)) {
            return res.status(401).send("Contraseña incorrecta"); 
        }

        const token = jwt.sign({user: userFinded.user, rol: userFinded.rol}, "metropol", {expiresIn: "1h"});

        res.cookie("cookieToken", token, {
            maxAge:33600000,
            httpOnly:true
        });

        res.redirect("/api/sessions/current");

        
    } catch (error) {
        res.status(500).send("error login");
    }
});

//current strategy

router.get("/current", passport.authenticate("jwt", { session: false }), (req, res) => {
    res.render("home", { user: req.user.user });
});
//logout

router.post ("/logout", (req, res) =>{
    res.clearCookie("cookieToken");
    res.redirect("/login");
})

//ruta admin

router.get ("/admin", passport.authenticate("current",{session:false}), (req,res) =>{
    if (req.user.rol !== "admin"){
        return res.status(403).send("denegated access");
    }

    res.render("admin");

})

export default router;