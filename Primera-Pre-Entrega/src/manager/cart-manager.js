import { __dirname } from '../path.js'
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

import ProductManager from "./product-manager.js";
const productManager = new ProductManager(`${__dirname}/data/products.json`)

export default class CartsManager {
    constructor(path) {
        this.filePath = path;
        this.carts = [];
    }

    async initialize() {
        try {
            if (!fs.existsSync(this.filePath)) {
                await fs.promises.writeFile(this.filePath, '[]');
            }
            const data = await fs.promises.readFile(this.filePath, 'utf8');
            this.carts = JSON.parse(data);
        } catch (error) {
            console.error("Error initializing carts data:", error);
        }
    }

    async saveData() {
        try {
            await fs.promises.writeFile(this.filePath, JSON.stringify(this.carts));
        } catch (error) {
            console.error("Error saving carts data:", error);
        }
    }

    async createCart() {
        try {
            await this.initialize();
            const cartId = uuidv4();
            const cart = { id: cartId, products: [] };
            this.carts.push(cart);
            await this.saveData();
            console.log('Cart created successfully.');
            return cart;
        } catch (error) {
            console.error("Error creating cart:", error);
        }
    }

    async getCartById(cartId) {
        try {
            await this.initialize();
            const cart = this.carts.find((cart) => cart.id === cartId);
            if (!cart) throw new Error("Cart not found");
            return cart;
        } catch (error) {
            console.error("Error getting cart by ID:", error);
        }
    }

    async addProductToCart(cartId, productId) {
        try {
            const productExist = await productManager.getProductById(productId);
            if (productExist ) { 
                await this.initialize();
                const cartIndex = this.carts.findIndex((cart) => cart.id === cartId);
                if (cartIndex !== -1) {
                    const productIndex = this.carts[cartIndex].products.findIndex((product) => product.id === productId);
                    if (productIndex !== -1) {
                        this.carts[cartIndex].products[productIndex].quantity++; // Si existe el producto suma 1
                    } else {
                        this.carts[cartIndex].products.push({ id: productId, quantity: 1 }); // Si no existe agrega el primero
                    }
                    await this.saveData();
                    console.log('Product added to cart successfully.');
                    return this.carts[cartIndex];
                } else {
                    console.log('Cart not found.');
                    return null;
                }
            }
        } catch (error) {
            console.error("Error adding product to cart:", error);
        }
    }
}
