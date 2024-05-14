import express from "express";
import ProductManager from "./manager/product-manager.js"

const productManager = new ProductManager("./products.json")

const app = express();

app.use(express.json());

app.get('/products', async(req, res)=>{
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

app.get('/products/:id', async(req, res)=>{
    try {
        const { id } = req.params;
        const product = await productManager.getProductById(id);
        if(!product) return res.status(404).json({ msg: "Product not found" });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
})

app.post('/products', async(req, res)=>{
    try {
        // console.log(req.body);
        const product = await productManager.addProduct(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ msg: error.messsage })
    }
})

app.put('/products/:id', async(req, res)=>{
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

app.delete('/products/:id', async(req, res)=>{
    try {
        const { id } = req.params;
        const productDel = await productManager.deleteProduct(id);
        if(!productDel) return res.status(404).json({ msg: "Product not found" });
        res.status(200).json({ msg: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
})

const PORT = 8080

app.listen(PORT, ()=>console.log(`Listening on port: ${PORT}`))
