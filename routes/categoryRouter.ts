import { Router } from "express";
import CategoryController from "../controllers/CategoryController";

const categoryRouter = Router();

categoryRouter.get("/", CategoryController.getCategories);
categoryRouter.get("/:id", CategoryController.getCategory);

export default categoryRouter;
