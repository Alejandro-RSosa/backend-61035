import * as service from "../services/cart.services.js";

export const addProductToCart = async(req, res, next) => {
    try {
        const { cartId } = req.params;
        const { prodId } = req.params;
        const resp = await service.addProductToCart(cartId, prodId);
        if(!resp) res.status(404).json({ msg: 'Error adding product' });
        else res.json(resp);
    } catch (error) {
        next(error.message);
    }
};

export const getAll = async (req, res, next) => {
    try {
        const carts = await service.getAll();
        res.json(carts);
    } catch (error) {
        next(error.message);
    }
};

export const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const cart = await service.getById(id);
        if(!cart) res.status(404).json({msg: 'Cart not found'});
        else res.json(cart);
    } catch (error) {
        next(error.message);
    }
};

export const create = async (req, res, next) => {
    try {
        const newCart = await service.create(req.body);
        if(!newCart) res.status(404).json({msg: 'Error creating Cart'});
        else res.json(newCart);
    } catch (error) {
        next(error.message);
    }
};
