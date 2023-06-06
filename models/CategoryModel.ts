import CategorySchema, { CategoryInterface } from "../schemas/categorySchema";
import { model } from "mongoose";

const Category = model<CategoryInterface>("Category", CategorySchema);

class CategoryModel {
  static async findAll() {
    try {
      return Category.find();
    } catch (err) {
      throw err;
    }
  }
}

export default CategoryModel;
