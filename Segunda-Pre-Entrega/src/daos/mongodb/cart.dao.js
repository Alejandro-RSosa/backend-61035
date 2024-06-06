import { CartModel } from "./models/cart.model.js";

export default class CartDaoMongoDB {

  async addProductToCart(cartId, productId) {
    try {
      return await CartModel.findByIdAndUpdate(
        cartId,
        { $push: { products: productId } },
        { new: true }
      );
    } catch (error) {
      throw new Error(error);      
    }
  }

  async getAll() {
    try {
      return await CartModel.find({});
    } catch (error) {
      throw new Error(error);
    }
  }

  async getById(id) {
    try {
      return await CartModel.findById(id).populate('products');
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(obj) {
    try {
      return await CartModel.create(obj);
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id, obj) {
    try {
      return await CartModel.findByIdAndUpdate(id, obj, { new: true });
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(id) {
    try {
      return await CartModel.findByIdAndDelete(id)
    } catch (error) {      
      throw new Error(error);
    }
  }
}