import { Router } from 'express';
import ProductController from '../controllers/product.controllers.js';
import { checkAuth } from '../middlewares/authJwt.js';
import { checkAdmin } from '../middlewares/checkAdmin.js';
const controller = new ProductController();

const router = Router();

router.route('/')
    .get([checkAuth], controller.getAll)
    .get([checkAuth], controller.getByCategoryCtr)
    .get([checkAuth], controller.getByStockCtr)
    .post([checkAuth, checkAdmin], controller.create);
router.route('/:id')
    .get([checkAuth], controller.getById)
    .put([checkAuth, checkAdmin], controller.update)
    .delete([checkAuth, checkAdmin], controller.delete);

export default router;
