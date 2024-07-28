import { initMongoDB } from "./daos/mongodb/connection.js";
import express from "express";
import router from "./routes/index.js";
import morgan from "morgan";
import { errorHandler } from "./middlewares/errorHandler.js";
import handlebars from 'express-handlebars';
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import session from "express-session";
import { __dirname } from './utils.js';
import passport from 'passport';
import './passport/local-strategy.js';
import './passport/google-strategy.js';
import 'dotenv/config';

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(session(storeConfig));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use(passport.initialize());
app.use(passport.session());

app.use('/', router);

app.use(errorHandler);

initMongoDB();

const PORT = 8080;

app.listen(PORT, () => console.log(`Server up on port: ${PORT}`));
