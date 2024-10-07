import MongoDao from "./mongo.dao.js";
import { ProductModel } from "./models/product.model.js";

export default class ProductDaoMongo extends MongoDao {
  constructor() {
    super(ProductModel);
  }

  async getProductByCategory(category) {
    try {
      return await ProductModel.find({ category: category });
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

  async getAll(page=1, limit=20, category, sort) {
    try {
      const filter = category ? { 'category': category } : {};
      let sortOrder = {};
      if(sort) sortOrder.price = sort ==='asc' ? 1 : sort === 'desc' ? -1 : null;
      return await ProductModel.paginate(filter, {page, limit, sort: sortOrder});
    } catch (error) {
      throw new Error(error);
    }
  }

  async getById(id) {
    try {
      return await ProductModel.findById(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(obj) {
    try {
      return await ProductModel.create(obj);
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id, obj) {
    try {
      return await ProductModel.findByIdAndUpdate(id, obj, { new: true });
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(id) {
    try {
      return await ProductModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
