import Services from "./class.services.js";
import factory from '../persistence/daos/factory.js';
import { generateProduct } from "../faker/product.utils.js";
import { ProductModel } from "../persistence/daos/mongodb/models/product.model.js";
const { prodDao } = factory;

export default class ProductService extends Services {
  constructor() {
    super(prodDao);
  }

  getProductByCategory = async (category) => {
    try {
      return await prodDao.getProductByCategory(category);
    } catch (error) {
      throw new Error(error);
    }
  }
  
  getProductByStock = async (stock) => {
    try {
      return await prodDao.getProductByStock(stock);
    } catch (error) {
      throw new Error(error);
    }
  }

  createProductMock = async (cant = 100) => {
    try {
      const productArray = [];
      for (let i = 0; i < cant; i++) {
        const product = generateProduct();
        productArray.push(product);
      }
      console.log(productArray);
      return await ProductModel.create(productArray);
    } catch (error) {
      throw new Error(error);
    }
  }
}
