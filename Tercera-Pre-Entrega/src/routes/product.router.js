import { Router } from 'express';
import ProductController from '../controllers/product.controllers.js';
const controller = new ProductController();

const router = Router();

router.route('/')
    .get(controller.getAll)
    .get(controller.getByCategoryCtr)
    .get(controller.getByStockCtr)
    .post(controller.create);
router.route('/:id')
    .get(controller.getById)
    .put(controller.update)
    .delete(controller.delete);

export default router;
