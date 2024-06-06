import { initMongoDB } from "./daos/mongodb/connection.js";
import express from "express";
import morgan from "morgan";
import productRouter from "./routes/product.router.js";
import cartRouter from "./routes/carts.router.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/products", productRouter);
app.use("/carts", cartRouter);

app.use(errorHandler);

initMongoDB();

const PORT = 8080;

app.listen(PORT, () => console.log(`Server up on port: ${PORT}`));
