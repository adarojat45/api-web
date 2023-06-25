import { model } from "mongoose";
import { PaginateOptionInterface } from "../interfaces/paginateInterface";
import { PostInterface } from "../interfaces/postInterfaces";
import postSchema from "../schemas/postSchema";

export const Post = model("Post", postSchema);

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

  static async paginate(
    query: any,
    option: any
  ): Promise<{ docs: PostInterface[] }> {
    try {
      const postAggregate = Post.aggregate([
        { $match: { ...query, isDeleted: false, isActive: true } },
        {
          $lookup: {
            from: "categories",
            localField: "_categories",
            foreignField: "_id",
            as: "_categories",
          },
        },
      ]);

      return await Post.aggregatePaginate(postAggregate, {
        ...option,
        sort: { createdAt: -1 },
      });
    } catch (error) {
      throw error;
    }
  }
}

export default PostModel;
