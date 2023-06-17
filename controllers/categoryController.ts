import { NextFunction, Request, Response } from "express";
import CategoryModel from "../models/CategoryModel";
import CategoryTransformer from "../transformers/CategoryTransformer";

class CategoryController {
  static async getCategories(_: Request, res: Response, next: NextFunction) {
    try {
      const categories = await CategoryModel.findAll();
      const categoriesTransformed = CategoryTransformer.list(categories);

      res.status(200).json(categoriesTransformed);
    } catch (err) {
      next(err);
    }
  }

  static async getCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const category = await CategoryModel.findOne(id);

      if (category) {
        const categoryTransformed = CategoryTransformer.detail(category);
        return res.status(200).json(categoryTransformed);
      } else {
        return res.status(404).json(null);
      }
    } catch (err) {
      next(err);
    }
  }
}

export default CategoryController;
