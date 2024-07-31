import Controllers from "./class.controller.js";
import CartService from '../services/cart.services.js';
import { createResponse } from "../utils.js";
const cartService = new CartService();

export default class CartController extends Controllers{
  constructor(){
    super(cartService)
  }

  addProdToCart = async (req, res, next) => {
    try {      
      const { cart } = req.user;
      const { idProd } = req.params;
      const newProdToUserCart = await this.service.addProdToCart(
        cart,
        idProd,
      );
      if (!newProdToUserCart) createResponse(res, 404, { msg: "Error adding product to cart" });
      else createResponse(res, 200, newProdToUserCart);
    } catch (error) {
      next(error);
    }
  };

  removeProdToCart = async (req, res, next) => {
    try {
      const { cart } = req.user;
      const { idProd } = req.params;
      const delProdToUserCart = await this.service.removeProdToCart(
        cart,
        idProd,
      );
      if (!delProdToUserCart) createResponse(res, 404, { msg: "cart or prod not exist" });
      else createResponse(res, 200, {msg: `product ${idProd} deleted from cart`});
    } catch (error) {
      next(error);
    }
  };

  updateProdQuantityToCart = async (req, res, next) => {
    try {
      const { cart } = req.user;
      const { idProd } = req.params;
      const { quantity } = req.body;
      const  updateProdQuantity = await this.service.updateProdQuantityToCart(
        cart,
        idProd,
        quantity
      );
      if (!updateProdQuantity) createResponse(res, 404, { msg: "cart or prod not exist" });
      else createResponse(res, 200, updateProdQuantity);
    } catch (error) {
      next(error);
    }
  };

  clearCart = async (req, res, next) => {
    try {
      const { cart } = req.user;
      const clearCart = await this.service.clearCart(
        cart,
      );
      if (!clearCart) createResponse(res, 404, { msg: "Error cleaning cart" });
      else createResponse(res, 200, clearCart);
    } catch (error) {
      next(error);
    }
  };
}
