import CategorySchema, { CategoryInterface } from "../schemas/categorySchema";
import { model } from "mongoose";

const Category = model<CategoryInterface>("Category", CategorySchema);

class CategoryModel {
  static async findAll() {
    try {
      return await Category.find();
    } catch (err) {
      throw err;
    }
  }

  static async findOne(id: String) {
    try {
      return await Category.findById(id);
    } catch (err) {
      throw err;
    }
  }
}

export default CategoryModel;
