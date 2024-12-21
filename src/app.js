//imports de express y demas
import express from 'express';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import dotenv from "dotenv";
import sessionRouter from './routes/sessions.router.js';
import viewsRouter from './routes/views.router.js';


//import de database
dotenv.config();
import "./database.js";

//iniciamos el servidor con express
const app = express();
const Puerto = process.env.PORT;

//middlewares
//este es el comando que nos permite usar los json
app.use(express.json());
//este es el comando que te permite pasar los url complicados
app.use(express.urlencoded({ extended: true}));
//metemo el cookie parser
app.use(cookieParser());
//para el public
app.use(express.static("./src/public"));

//en passport
app.use(passport.initialize());
initializePassport();

// Configuración del motor de vistas
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');


//rutas

app.use("/", viewsRouter);
app.use("/api/sessions", sessionRouter);

//listen

app.listen(Puerto, () => {
    console.log(`El servidor esta corriendo en el puerto ${Puerto}`);
});




