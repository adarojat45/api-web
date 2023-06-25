import { NextFunction, Request, Response } from "express";
import PostModel from "../models/PostModel";
import PostTransformer from "../transformers/PostTransformer";
import algolia from "../services/algolia";
import { PaginateOptionInterface } from "../interfaces/paginateInterface";
import {
  PostListOutputInterface,
  PostDetailOutputInterface,
  PostInterface,
} from "../interfaces/postInterfaces";

class PostController {
  static async getPosts(req: Request, res: Response, next: NextFunction) {
    try {
      let skip: number = 0;
      let { page = 1, limit = 10 } = req.query;

      let option: PaginateOptionInterface = {
        page: Number(page),
        limit: Number(limit),
        skip,
      };

      //      if (!page) option = { ...option, page: 1 };

      if (limit) option = { ...option, limit: Number(limit) };

      if (page)
        option = {
          ...option,
          skip: Number(limit) * Number(page) - Number(limit),
        };

      const { docs, ...rest } = await PostModel.paginate(null, option);
      const postsTransformed: PostListOutputInterface[] =
        PostTransformer.list(docs);

      res.status(200).json({ posts: postsTransformed, metaData: rest });
    } catch (err) {
      next(err);
    }
  }

  static async getPost(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug } = req.params;
      const post: PostInterface | null = await PostModel.findOne(slug);

      if (!post)
        throw { name: "NotFound", code: 404, message: "Post not found" };

      const postTransformed: PostDetailOutputInterface =
        PostTransformer.detail(post);

      const { docs } = await PostModel.paginate(
        {
          tags: { $in: postTransformed.tags },
        },
        {}
      );

      const postsTransformed: PostListOutputInterface[] =
        PostTransformer.list(docs);

      res.status(200).json({
        ...postTransformed,
        relatedPosts: postsTransformed,
      });
    } catch (err) {
      next(err);
    }
  }

  static async searchPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const { q } = req.query;

      if (!q) throw { code: 400, name: "BadRequest", message: "q is required" };

      const posts = await PostModel.search(String(q));

      res.status(200).json({ posts });
    } catch (err) {
      next(err);
    }
  }
}

export default PostController;
