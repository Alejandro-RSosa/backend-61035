import express from "express";
import { __dirname } from './path.js'
import handlebars from "express-handlebars"
import productRouter from './routes/products.router.js'
import cartRouter from './routes/carts.router.js'
import viewsRouter from './routes/views.router.js'
import { Server } from "socket.io"
import ProductManager from "./manager/product-manager.js";

const productManager = new ProductManager(__dirname+'/data/products.json');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use('/products', productRouter);
app.use('/carts', cartRouter);
app.use('/realtimeproducts', viewsRouter);

app.get('/home', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render('home', { products });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

const PORT = 8080

const httpServer = app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))

const socketServer = new Server(httpServer)

const products = [];

socketServer.on('connection', (socket) => {
    console.log(`New connection - ${socket.id}`);
    
    socket.on('disconnect', ()=>{
        console.log(`Disonnected - ${socket.id}`);
    });

    socket.on('newProduct', (prod) => {
        products.push(prod);
        socketServer.emit('products', products);
    })

})