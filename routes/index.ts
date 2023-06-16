import { Router } from "express";
import CategoryController from "../controllers/categoryController";
import errorHandler from "../middlewares/errorHandler";

const router = Router();

router.get("/categories", CategoryController.getCategories);
router.get("/categories/:id", CategoryController.getCategory);
router.use(errorHandler);

export default router;
