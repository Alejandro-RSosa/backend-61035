import { initMongoDB } from "./daos/mongodb/connection.js";
import express from "express";
import morgan from "morgan";
import productRouter from "./routes/product.router.js";
import cartRouter from "./routes/carts.router.js";
import userRouter from './routes/user.router.js';
import viewsRouter from './routes/views.router.js';
import { errorHandler } from "./middlewares/errorHandler.js";
import handlebars from 'express-handlebars';
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import session from "express-session";
import { __dirname } from './utils.js';
import passport from 'passport';
import './passport/local-strategy.js';
import 'dotenv/config';

const storeConfig = {
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
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

app.use("/products", productRouter);
app.use("/carts", cartRouter);
app.use("/users", userRouter);
app.use("/", viewsRouter);

app.use(errorHandler);

initMongoDB();

const PORT = 8080;

app.listen(PORT, () => console.log(`Server up on port: ${PORT}`));
