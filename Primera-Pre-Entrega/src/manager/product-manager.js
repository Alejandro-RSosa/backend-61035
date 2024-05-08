import { __dirname } from '../path.js'
import fs from "fs";
import { v4 as uuidv4 } from "uuid";


export default class ProductManager {

    constructor(path){
        this.filePath = path;
        this.products = [];
    }
    // Chequea si no existe el archivo lo crea y lo lee
    async initialize() {
        try {
            if (!fs.existsSync(this.filePath)) {
                await fs.promises.writeFile(this.filePath, '[]');
            }
            const data = await fs.promises.readFile(this.filePath, 'utf8');
            this.products = JSON.parse(data);
        } catch (error) {
            console.error("Error initializing product data:", error);
        }
    }
    
    // Guarda los cambios
    async saveData() {
        try {
            await fs.promises.writeFile(this.filePath, JSON.stringify(this.products));
        } catch (error) {
            console.error("Error saving product data:", error);
        }
    }

    // Crea un nuevo producto
    async addProduct(productData){
        try {
            const { title, description, price, thumbnail, code, stock, status=true, category } = productData;

            if(!title || !description || !price || !code || !stock || !category){
                console.log("All fields required");
                return;
            }
            await this.initialize();
            const prod = this.products.find((product) => product.code === code);
            if (prod){
                console.log(`Code ${code} already exists`);
                return;
            } else {
                const productId = uuidv4();
                const product = { id: productId, title, description, price, thumbnail, code, stock, status, category };
                this.products.push(product);
                await this.saveData();
                console.log('Product added successfully.');
            }
        } catch (error) {
            console.error("Error adding product:", error);
        }
    }

    // Obtiene todos los productos o vacio
    async getProducts(limit = null){
        try {
            await this.initialize();
            if (limit !== null) {
                return this.products.slice(0, limit);
            } else {
                return this.products;
            }
        } catch (error) {
            console.error("Error getting products:", error);
            throw error;
        }
    }
    
    // Obtiene producto por ID
    async getProductById(id){
        try {
            await this.initialize();
            const product = this.products.find((product) => product.id === id);
            if (!product) throw new Error("Product not found");
            return product;
        } catch (error) {
            console.error("Error getting product by ID:", error);
        }
    }

    // Actualiza un producto, se debe especificar el campo
    async updateProduct(productId, updatedFields){
        try {
            await this.initialize();
            const index = this.products.findIndex(product => product.id === productId);
            if (index !== -1) {
                this.products[index] = { ...this.products[index], ...updatedFields };
                await this.saveData();
                console.log('Product updated successfully.');
                return this.products[index];
            } else {
                console.log('Product not found.');
                return null;
            }
        } catch (error) {
            console.error("Error updating product:", error);
            throw error;
        }
    }

    // Elimina un producto por ID
    async deleteProduct(productId){
        try {
            await this.initialize();
            const index = this.products.findIndex(product => product.id === productId);
            if (index !== -1) {
                this.products.splice(index, 1);
                await this.saveData();
                console.log('Product deleted successfully.');
                return true;
            } else {
                console.log('Product not found.');
                return false;
            }
        } catch (error) {
            console.error("Error deleting product:", error);
            throw error;
        }
    }
}
