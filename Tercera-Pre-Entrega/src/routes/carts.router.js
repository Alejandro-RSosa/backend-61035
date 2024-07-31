import { Router } from "express";
import CartController from '../controllers/cart.controllers.js';
import { checkAuth } from "../middlewares/authJwt.js";
import { checkAdmin } from "../middlewares/checkAdmin.js";
const controller = new CartController();

const router = Router();

router.route("/")
    .get([checkAuth], controller.getAll)
    .post([checkAuth, checkAdmin], controller.create);

router.route("/:id")
    .get([checkAuth], controller.getById)
    .put([checkAuth, checkAdmin], controller.update)
    .delete([checkAuth, checkAdmin], controller.delete);

router.route("/products/:idProd")
    .post([checkAuth], controller.addProdToCart)
    .delete([checkAuth], controller.removeProdToCart)
    .put([checkAuth], controller.updateProdQuantityToCart);

router.delete("/clear/:idCart", [checkAuth], controller.clearCart);

export default router;
