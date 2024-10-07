import express from "express";
import MainRouter from "./routes/index.js";
import morgan from "morgan";
import { errorHandler } from "./middlewares/errorHandler.js";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import session from "express-session";
import { __dirname } from './utils.js';
import passport from 'passport';
import './passport/local-strategy.js';
import './passport/google-strategy.js';
import 'dotenv/config';
import logger from './logger.js';
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { info } from "./docs/info.js";
import cors from 'cors';

const mainRouter = new MainRouter();

const storeConfig = {
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_ATLAS_URL,
        crypto: { secret: process.env.SECRET_KEY },
        ttl: 180,
    }),
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 180000 }
}

const app = express();

// Configuración de CORS
const corsOptions = {
    origin: 'http://backend.elchuleta.work', // Permite todas las solicitudes (puedes restringir a un dominio específico si lo prefieres)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos HTTP permitidos
    // allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
    credentials: true, // Permite el envío de cookies si es necesario
};

// Aplicar CORS con opciones
app.use(cors(corsOptions));

const specs = swaggerJSDoc(info);

app.use((req, res, next) => {
    logger.http(`${req.method} ${req.url}`);
    next();
  });

app
    .use('/docs', swaggerUi.serve, swaggerUi.setup(specs))
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(morgan("dev"))
    .use(cookieParser())
    .use(session(storeConfig))
    .use(passport.initialize())
    .use(passport.session())
    .use('/', mainRouter.getRouter())
    .use(errorHandler)

console.log = (...args) => logger.info(...args);
console.error = (...args) => logger.error(...args);

const PORT = process.env.PORT

app.listen(PORT, () => logger.info(`Server up on port: ${PORT}`));
