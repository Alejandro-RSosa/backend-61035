import { Router } from "express";
import productRouter from "./product.router.js";
import cartRouter from "./carts.router.js";
import userRouter from './user.router.js';
import ticketRouter from './ticket.router.js';
import loggerRouter from './logger.router.js';

export default class MainRouter {
    constructor() {
        this.router = Router();
        this.init();
    }

    init() {
        this.router.use("/products", productRouter);
        this.router.use("/carts", cartRouter);
        this.router.use("/users", userRouter);
        this.router.use('/ticket', ticketRouter);
        this.router.use('/loggerTest', loggerRouter);
    }

    getRouter() {
        return this.router;
    }
}
