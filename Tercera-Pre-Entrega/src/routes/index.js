import { Router } from "express";
import productRouter from "./product.router.js";
import cartRouter from "./carts.router.js";
import userRouter from './user.router.js';
import viewsRouter from './views.router.js';

const router = Router();

router.use("/products", productRouter);
router.use("/carts", cartRouter);
router.use("/users", userRouter);
router.use("/", viewsRouter);

export default router;