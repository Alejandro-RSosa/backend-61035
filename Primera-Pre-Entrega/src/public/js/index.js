const socketClient = io()

const form = document.getElementById('form')
const inputTitle = document.getElementById('title')
const inputDescription = document.getElementById('description')
const inputPrice = document.getElementById('price')
const inputThumbnail = document.getElementById('thumbnail')
const inputCode = document.getElementById('code')
const inputStock = document.getElementById('stock')
const inputStatus = document.getElementById('status')
const inputCategory = document.getElementById('category')
const products = document.getElementById('products')

form.onsubmit = (e) => {
    e.preventDefault();
    const title = inputTitle.value;
    const description = inputDescription.value;
    const price = inputPrice.value;
    const thumbnail = inputThumbnail.value;
    const code = inputCode.value;
    const stock = inputStock.value;
    const status = inputStatus.value;
    const category = inputCategory.value;
    const product = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        status,
        category
    };
    socketClient.emit('newProduct', product);
}

socketClient.on('products', (p) => {
    let prods = '';
    p.map((prod) => {
        prods += `${prod.title} - ${prod.price} </br>`
    })
    products.innerHTML = prods
})