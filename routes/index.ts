import { Router } from "express";
import CategoryController from "../controllers/categoryController";

const router = Router();

router.get("/categories", CategoryController.getCategories);

export default router;
