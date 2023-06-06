import { Request, Response } from "express";
import CategoryModel from "../models/CategoryModel";
import CategoryTransformer from "../transformers/CategoryTransformer";

class CategoryController {
  static async getCategories(_: Request, res: Response) {
    try {
      const categories = await CategoryModel.findAll();
      const categoriesTransformed = CategoryTransformer.list(categories);
      res.status(200).json(categoriesTransformed);
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "err" });
    }
  }
}

export default CategoryController;
