import { __dirname } from '../path.js'
import express, { Router } from "express"
express.Router();

const router = Router();

import ProductManager from "../manager/product-manager.js"
const productManager = new ProductManager(__dirname+'/data/products.json')

router.get('/', async(req, res)=>{
    try {
        const limit = parseInt(req.query.limit);
        let products;

        if (isNaN(limit)) {
            products = await productManager.getProducts();
        } else {
            products = await productManager.getProducts(limit);
        }

        if(products.length === 0) {
            return res.status(404).json({ msg: "No products found" });
        }

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
})

router.get('/:id', async(req, res)=>{
    try {
        const { id } = req.params;
        const product = await productManager.getProductById(id);
        if(!product) return res.status(404).json({ msg: "Product not found" });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
})
router.post('/', async(req, res)=>{
    try {
        console.log(req.body);
        const product = await productManager.addProduct(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ msg: error.messsage })
    }
})

router.put('/:id', async(req, res)=>{
    try {
        const { id } = req.params;
        const updatedFields = req.body;
        const productUpd = await productManager.updateProduct(id, updatedFields);
        if(!productUpd) return res.status(404).json({ msg: "Error updating product" });
        res.status(200).json(productUpd);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
})

router.delete('/:id', async(req, res)=>{
    try {
        const { id } = req.params;
        const productDel = await productManager.deleteProduct(id);
        if(!productDel) return res.status(404).json({ msg: "Product not found" });
        res.status(200).json({ msg: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
})

export default router;
