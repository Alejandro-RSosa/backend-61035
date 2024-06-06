import { Router } from "express";
import * as controllers from "../controllers/cart.controllers.js";

const router = Router();

router.post('/', controllers.create);
router.get('/', controllers.getAll);
router.get('/:id', controllers.getById);
router.post('/add/:cartId/:prodId', controllers.addProductToCart);

export default router;
