import { NextFunction, Request, Response } from "express";
import CategoryModel from "../models/CategoryModel";
import CategoryTransformer from "../transformers/CategoryTransformer";
import {
  CategoryListOutputInterface,
  CategoryDetailOutputInterface,
  CategoryInterface,
} from "../interfaces/categoryInterface";

class CategoryController {
  static async getCategories(_: Request, res: Response, next: NextFunction) {
    try {
      const categories: CategoryInterface[] = await CategoryModel.findAll();
      const categoriesTransformed: CategoryListOutputInterface[] =
        CategoryTransformer.list(categories);

      res.status(200).json(categoriesTransformed);
    } catch (err) {
      next(err);
    }
  }

  static async getCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug } = req.params;
      const category: CategoryInterface | null = await CategoryModel.findOne(
        slug
      );

      if (!category)
        throw {
          name: "NotFound",
          code: 404,
          message: "Category not found",
        };

      const categoryTransformed: CategoryDetailOutputInterface =
        CategoryTransformer.detail(category);
      return res.status(200).json(categoryTransformed);
    } catch (err) {
      next(err);
    }
  }
}

export default CategoryController;
