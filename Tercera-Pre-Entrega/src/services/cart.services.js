import Services from "./class.services.js";
import factory from '../persistence/daos/factory.js';
const { cartDao } = factory;
const { prodDao } = factory;

export default class CartServices extends Services {
  constructor() {
    super(cartDao);
  }

  addProdToCart = async (cartId, prodId) => {
    try {
      const existCart = await this.getById(cartId);
      if (!existCart) return null;
  
      const existProd = await prodDao.getById(prodId);
      if (!existProd) return null;
  
      return await this.dao.addProdToCart(cartId, prodId);
    } catch (error) {
      throw new Error(error);
    }
  };

  removeProdToCart = async (cartId, prodId) => {
    try {
      const existCart = await this.getById(cartId);
      if(!existCart) return null;
      const existProdInCart = await this.dao.existProdInCart(cartId, prodId);
      if (!existProdInCart) return null;
      return await this.dao.removeProdToCart(cartId, prodId);
    } catch (error) {
      throw new Error(error);
    }
  };

  updateProdQuantityToCart = async (cartId, prodId, quantity) => {
    try {
      const existCart = await this.getById(cartId);
      if(!existCart) return null;
  
      const existProdInCart = await this.dao.existProdInCart(cartId, prodId);
      if (!existProdInCart) return null;
  
      return await this.dao.updateProdQuantityToCart(cartId, prodId, quantity);
    } catch (error) {
      throw new Error(error);
    }
  };

  clearCart = async (cartId) => {
    try {
      const existCart = await this.getById(cartId);
      console.log("existCart-->", existCart);
      if (!existCart) return null;
      return await this.dao.clearCart(cartId);
    } catch (error) {
      throw new Error(error);
    }
  };
}