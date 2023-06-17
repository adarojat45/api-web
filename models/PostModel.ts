import { model } from "mongoose";
import { PostInterface } from "../interfaces/postInterfaces";
import postSchema from "../schemas/postSchema";

const Post = model<PostInterface>("Post", postSchema);

class PostModel {
  static async findAll() {
    try {
      return await Post.find({
        isActive: true,
        isDeleted: false,
      });
    } catch (err) {
      throw err;
    }
  }
}

export default PostModel;
