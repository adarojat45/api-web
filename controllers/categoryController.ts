import { NextFunction, Request, Response } from "express";
import CategoryModel from "../models/CategoryModel";
import CategoryTransformer from "../transformers/CategoryTransformer";

function identity<Input, Ouput>(arg: Input): Ouput {
  return arg;
}

class CategoryController {
  static async getCategories(_: Request, res: Response, next: NextFunction) {
    try {
      const categories = await CategoryModel.findAll();
      const categoriesTransformed = CategoryTransformer.list(categories);
      const x = identity<string, number>(10);
      res.status(200).json({ categoriesTransformed, x });
    } catch (err) {
      next(err);
    }
  }

  static async getCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const category = await CategoryModel.findOne(id);
      const categoryTransformed = CategoryTransformer.detail(category);
      res.status(200).json(categoryTransformed);
    } catch (err) {
      next(err);
    }
  }
}

export default CategoryController;
