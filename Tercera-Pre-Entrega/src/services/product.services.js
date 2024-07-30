import Services from "./class.services.js";
// import ProductDaoMongo from "../daos/mongodb/product.dao.js";
// const prodDao = new ProductDaoMongo();
import persistence from '../daos/persistence.js';
const { prodDao } = persistence;

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
}
