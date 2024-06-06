import { ProductModel } from "./models/product.model.js";

export default class ProductDaoMongoDB {
  constructor() {}

  async getProductByCategory(category) {
    try {
      return await ProductModel.find({ category: category }).explain();
    } catch (error) {
      throw new Error(error);
    }
  }

  async getProductByStock(stock) {
    try {
      return await ProductModel.find({ stock: stock });
    } catch (error) {
      throw new Error(error);
    }
  }

  // Obtiene todos los productos o vacio
  async getAll() {
    try {
      return await ProductModel.find({});
    } catch (error) {
      throw new Error(error);
    }
  }

  // Obtiene producto por ID
  async getById(id) {
    try {
      return await ProductModel.findById(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  // Crea un nuevo producto
  async create(obj) {
    try {
      return await ProductModel.create(obj);
    } catch (error) {
      throw new Error(error);
    }
  }

  // Actualiza un producto, se debe especificar los campos
  async update(id, obj) {
    try {
      return await ProductModel.findByIdAndUpdate(id, obj, { new: true });
    } catch (error) {
      throw new Error(error);
    }
  }

  // Elimina un producto por ID
  async delete(id) {
    try {
      return await ProductModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
