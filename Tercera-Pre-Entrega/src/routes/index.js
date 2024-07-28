import { Router } from "express";
import productRouter from "./product.router.js";
import cartRouter from "./carts.router.js";
import userRouter from './user.router.js';

export default class MainRouter {
    constructor() {
        this.router = Router();
        this.init();
    }

    init() {
        this.router.use("/products", productRouter);
        this.router.use("/carts", cartRouter);
        this.router.use("/users", userRouter);
    }

    getRouter() {
        return this.router;
    }
}
