import * as service from "../services/product.services.js";

export const getByCategoryCtr = async (req, res, next) => {
    try {
      const { category } = req.query;
      const prod = await service.getProductByCategory(category);
      if (!prod) res.status(404).json({ msg: "Category not found!" });
      res.json(prod);
    } catch (error) {
      next(error);
    }
  };

export const getByStockCtr = async (req, res, next) => {
    try {
      const { stock } = req.query;
      const prod = await service.getProductByStock(stock);
      if (!prod) res.status(404).json({ msg: "Stock not found!" });
      res.json(prod);
    } catch (error) {
      next(error);
    }
  };

export const getAll = async (req, res, next) => {
    try {
        const products = await service.getAll();
        res.json(products);
    } catch (error) {
        next(error.message);
    }
};

export const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await service.getById(id);
        if(!product) res.status(404).json({msg: 'Product not found'});
        else res.json(product);
    } catch (error) {
        next(error.message);
    }
};

export const create = async (req, res, next) => {
    try {
        const newProd = await service.create(req.body);
        if(!newProd) res.status(404).json({msg: 'Error creating product'});
        else res.json(newProd);
    } catch (error) {
        next(error.message);
    }
};

export const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updProd = await service.update(id, req.body);
        console.log(updProd);
        if(!updProd) res.status(404).json({msg: 'Error updating product'});
        else res.json(updProd);
    } catch (error) {
        next(error.message);
    }
};

export const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        const delProd = await service.remove(id);
        if(!delProd) res.status(404).json({msg: 'Error deleting product'});
        else res.json(delProd);
    } catch (error) {
        next(error.message);
    }
};
