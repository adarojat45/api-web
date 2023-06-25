import CategorySchema from "../schemas/categorySchema";
import { model } from "mongoose";
import { CategoryInterface } from "../interfaces/categoryInterface";

export const Category = model<CategoryInterface>("Category", CategorySchema);

class CategoryModel {
  static async findAll(): Promise<CategoryInterface[]> {
    try {
      return await Category.find({
        isActive: true,
        isDeleted: false,
      });
    } catch (err) {
      throw err;
    }
  }

  static async findOne(slug: string): Promise<CategoryInterface | null> {
    try {
      const category = await Category.findOne({ slug: slug }).populate(
        "_posts"
      );
      return category;
    } catch (err) {
      throw err;
    }
  }
}

export default CategoryModel;
