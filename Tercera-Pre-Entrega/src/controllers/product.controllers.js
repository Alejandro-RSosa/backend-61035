import Controllers from "./class.controller.js";
import ProductService from "../services/product.services.js";
const prodService = new ProductService();

export default class ProductController extends Controllers {
  constructor() {
    super(prodService);
  }

  getByCategoryCtr = async (req, res, next) => {
    try {
      const { category } = req.query;
      const prod = await service.getProductByCategory(category);
      if (!prod) res.status(404).json({ msg: "Category not found!" });
      res.json(prod);
    } catch (error) {
      next(error);
    }
  };
  
  getByStockCtr = async (req, res, next) => {
    try {
      const { stock } = req.query;
      const prod = await service.getProductByStock(stock);
      if (!prod) res.status(404).json({ msg: "Stock not found!" });
      res.json(prod);
    } catch (error) {
      next(error);
    }
  };

  createProductMockCtr = async (req, res, next) => {
    try {
      const { cant } = req.query;
      const prod = await service.createProductMock(cant);
      res.json(prod);
    } catch (error) {
      next(error);
    }
  };
}
