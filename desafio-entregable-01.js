class ProductManager {

    constructor(){

        this.products = [];
    }
    addProduct(title, description, price, thumbnail, code, stock){

        if(!title || !description || !price || !thumbnail || !code || !stock){
            console.log("All fields required");
            return;
        }

        const product = {
            id: this.#getMaxId() + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };
        const prod = this.#getProducts(code)
        if (prod){
            return console.log(`Code ${code} already exists`)
        } else {
            this.products.push(product);
        }
    }

    #getProducts(code){
        if(this.products.find((product) => product.code === code)){
            return true;
        } else {
            return false;
        }
    }

    #getMaxId() {
        let maxId = 0;
        this.products.map((product) => { 
        if (product.id > maxId) maxId = product.id;
        });
        return maxId;
    }

    getProducts(){
        return this.products;
    }

    getProductById(id){
        return this.products.find((product) => product.id === id);
    }

}
const productManager = new ProductManager();

productManager.addProduct('Arroz', 'Grano', 40, 'https://www.fotos.com/Arroz.jpg', 123, 200);
productManager.addProduct('Repetido', 'Repetido', 40, 'https://www.fotos.com/Repetido.jpg', 123, 15);
productManager.addProduct('Fideos', 'Secos', 45, 'https://www.fotos.com/Fideos.jpg', 124, 100);
productManager.addProduct('Cafe', 'Vicio', 90, 'https://www.fotos.com/Cafe.jpg', 125, 100);
productManager.addProduct('Yerba', 'Vicio', 80, 'https://www.fotos.com/Yerba.jpg', 126, 100);
console.log(productManager.getProducts())
console.log(productManager.getProductById(1))
console.log(productManager.getProductById(3))
