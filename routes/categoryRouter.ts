import { Router } from "express";
import CategoryController from "../controllers/CategoryController";

const categoryRouter = Router();

categoryRouter.get("/", CategoryController.getCategories);
categoryRouter.get("/:slug", CategoryController.getCategory);

export default categoryRouter;
