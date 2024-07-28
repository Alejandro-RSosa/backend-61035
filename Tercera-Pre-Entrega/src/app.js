import { initMongoDB } from "./daos/db/connection.js";
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
app
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(morgan("dev"))
    .use(cookieParser())
    .use(session(storeConfig))
    .use(passport.initialize())
    .use(passport.session())    
    .use('/', mainRouter.getRouter())
    .use(errorHandler)

initMongoDB();

const PORT = process.env.PORT

app.listen(PORT, () => console.log(`Server up on port: ${PORT}`));
