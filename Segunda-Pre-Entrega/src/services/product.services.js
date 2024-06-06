import ProductDaoMongoDB from "../daos/mongodb/product.dao.js";
const prodDao = new ProductDaoMongoDB();

// import {__dirname} from '../utils.js';
// import ProductDaoFS from '../daos/filesystem/product.dao.js';
// const prodDao = new ProductDaoFS(`${__dirname}/daos/filesystem/data/products.json`);

export const getProductByCategory = async (category) => {
  try {
    return await prodDao.getProductByCategory(category);
  } catch (error) {
    throw new Error(error);
  }
}

export const getProductByStock = async (stock) => {
  try {
    return await prodDao.getProductByStock(stock);
  } catch (error) {
    throw new Error(error);
  }
}

export const getAll = async (page, limit, category, sort) => {
  try {
    return await prodDao.getAll(page, limit, category, sort);
  } catch (error) {
    throw new Error(error);
  }
};

export const getById = async (id) => {
  try {
    return await prodDao.getById(id);
  } catch (error) {
    throw new Error(error);
  }
};

export const create = async (obj) => {
  try {
    return await prodDao.create(obj);
  } catch (error) {
    throw new Error(error);
  }
};

export const update = async (id, obj) => {
  try {
    return await prodDao.update(id, obj);
  } catch (error) {
    throw new Error(error);
  }
};

export const remove = async (id) => {
  try {
    return await prodDao.delete(id);
  } catch (error) {
    throw new Error(error);
  }
};
