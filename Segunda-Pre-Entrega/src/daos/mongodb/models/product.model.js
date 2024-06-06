import { Schema, model } from "mongoose";

const productCollectionName = "products";

const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String, reuired: false },
  code: { type: Number, required: true, unique: true },
  stock: { type: Number, required: true, index: true },
  status: { type: Boolean, default: true },
  category: { type: String, required: true, index: true },
});

export const ProductModel = model(productCollectionName, productSchema);
