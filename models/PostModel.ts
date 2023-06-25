import { model } from "mongoose";
import { PaginateOptionInterface } from "../interfaces/paginateInterface";
import {
  PostInterface,
  PostListOutputInterface,
} from "../interfaces/postInterfaces";
import postSchema from "../schemas/postSchema";
import algolia from "../services/algolia";

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

  static async search(q: string) {
    try {
      const index = algolia.initIndex("posts");
      let { hits } = await index.search<PostListOutputInterface>(String(q));

      let posts = hits?.map((hit) => {
        const { _highlightResult, objectID, ...rest } = hit;
        return rest;
      });

      return posts;
    } catch (err) {
      throw err;
    }
  }
}

export default PostModel;
