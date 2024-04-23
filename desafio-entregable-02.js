const fs = require('fs');

class ProductManager {

    constructor(path){
        this.filePath = path
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
            const { title, description, price, thumbnail, code, stock } = productData;

            if(!title || !description || !price || !thumbnail || !code || !stock){
                console.log("All fields required");
                return;
            }

            const prod = this.products.find((product) => product.code === code);
            if (prod){
                console.log(`Code ${code} already exists`);
                return;
            } else {
                const productId = this.getMaxId() + 1;
                const product = { id: productId, title, description, price, thumbnail, code, stock };
                this.products.push(product);
                await this.saveData();
                console.log('Product added successfully.');
            }
        } catch (error) {
            console.error("Error adding product:", error);
        }
    }

    // Obtiene todos los productos o vacio
    async getProducts(){
        try {
            if(fs.existsSync(this.filePath)){
                await this.initialize();
                return this.products;
            } else return [];
        } catch (error) {
            console.error("Error getting products:", error);
            return [];
        }
    }

    // Obtiene producto por ID
    async getProductById(id){
        try {
            await this.initialize();
            return this.products.find((product) => product.id === id);
        } catch (error) {
            console.error("Error getting product by ID:", error);
            return null;
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
            } else {
                console.log('Product not found.');
            }
        } catch (error) {
            console.error("Error updating product:", error);
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
            } else {
                console.log('Product not found.');
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    }

    // Valor de ID
    getMaxId() {
        let maxId = 0;
        this.products.forEach(product => {
            if (product.id > maxId) {
                maxId = product.id;
            }
        });
        return maxId;
    }
}

const productManager = new ProductManager("./products.json");

const test = async () => {
    await productManager.initialize();

    // Prueba agregar productos
    await productManager.addProduct({
        title: 'Producto1',
        description: 'Descripción1',
        price: 50,
        thumbnail: 'https://www.example.com/producto1.jpg',
        code: 120,
        stock: 50
    });
    await productManager.addProduct({
        title: 'Producto2',
        description: 'Descripción2',
        price: 30,
        thumbnail: 'https://www.example.com/producto2.jpg',
        code: 121,
        stock: 50
    });
    await productManager.addProduct({
        title: 'Producto3',
        description: 'Descripción3',
        price: 20,
        thumbnail: 'https://www.example.com/producto3.jpg',
        code: 122,
        stock: 50
    });
    await productManager.addProduct({
        title: 'Producto4',
        description: 'Descripción4',
        price: 70,
        thumbnail: 'https://www.example.com/producto4.jpg',
        code: 123,
        stock: 50
    });

    
    // Prueba producto por ID
    const productById = await productManager.getProductById(4);
    console.log(productById);
    
    // Prueba actualizacion de producto, en este caso el precio
    await productManager.updateProduct(1, { price: 160 });
    
    // Prueba eliminacion de producto
    await productManager.deleteProduct(2);

    // Ver todos los productos
    const allProducts = await productManager.getProducts();
    console.log(allProducts);
}

test();
