import { Router } from "express";
import * as controllers from "../controllers/product.controllers.js";

const router = Router();

router.get("/", controllers.getAll);
router.get("/:id", controllers.getById);
router.post("/", controllers.create);
router.put("/:id", controllers.update);
router.delete("/:id", controllers.remove);
router.get('/', controllers.getByCategoryCtr);
router.get('/', controllers.getByStockCtr);

export default router;
