import CategorySchema from "../schemas/categorySchema";
import { model } from "mongoose";
import { CategoryInterface } from "../interfaces/categoryInterface";

const Category = model<CategoryInterface>("Category", CategorySchema);

class CategoryModel {
  static async findAll() {
    try {
      return await Category.find({
        isActive: true,
        isDeleted: false,
      });
    } catch (err) {
      throw err;
    }
  }

  static async findOne(id: String) {
    try {
      const category = await Category.findById(id).populate("_posts");
      return category;
    } catch (err) {
      throw err;
    }
  }
}

export default CategoryModel;
