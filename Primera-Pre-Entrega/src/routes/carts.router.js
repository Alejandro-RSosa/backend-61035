import { __dirname } from '../path.js'
import express from "express";
import CartsManager from "../manager/cart-manager.js";

const router = express.Router();
const cartsManager = new CartsManager(`${__dirname}/data/carts.json`);

router.post('/', async(req, res) => {
    try {
        const cart = await cartsManager.createCart();
        res.status(201).json(cart);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

router.get('/:cid', async(req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartsManager.getCartById(cid);
        if (!cart) return res.status(404).json({ msg: "Cart not found" });
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

router.post('/:cid/product/:pid', async(req, res) => {
    try {
        const { cid, pid } = req.params;
        const cart = await cartsManager.addProductToCart(cid, pid);
        if (!cart) return res.status(404).json({ msg: "Cart not found" });
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

export default router;
