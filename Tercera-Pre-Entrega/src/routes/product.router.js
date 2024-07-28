import { Router } from "express";
import * as controllers from "../controllers/product.controllers.js";

const router = Router();

router.route('/')
    .get(controllers.getAll)
    .get(controllers.getByCategoryCtr)
    .get(controllers.getByStockCtr)
    .post(controllers.create);
router.route('/:id')
    .get(controllers.getById)
    .put(controllers.update)
    .delete(controllers.remove);

// router.get("/", controllers.getAll);
// router.get("/:id", controllers.getById);
// router.post("/", controllers.create);
// router.put("/:id", controllers.update);
// router.delete("/:id", controllers.remove);
// router.get('/', controllers.getByCategoryCtr);
// router.get('/', controllers.getByStockCtr);

export default router;
