import { model } from "mongoose";
import { PostInterface } from "../interfaces/postInterfaces";
import postSchema from "../schemas/postSchema";

const Post = model<PostInterface>("Post", postSchema);

class PostModel {
  static async findAll(): Promise<PostInterface[]> {
    try {
      return await Post.find({
        isActive: true,
        isDeleted: false,
      }).populate("_categories");
    } catch (err) {
      throw err;
    }
  }

  static async findOne(slug: string): Promise<PostInterface | null> {
    try {
      return await Post.findOne({
        slug,
        isActive: true,
        isDeleted: false,
      }).populate("_categories");
    } catch (err) {
      throw err;
    }
  }
}

export default PostModel;
