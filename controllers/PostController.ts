import { NextFunction, Request, Response } from "express";
import PostModel from "../models/PostModel";
import PostTransformer from "../transformers/PostTransformer";
import algolia from "../services/algolia";
import { PaginateOptionInterface } from "../interfaces/paginateInterface";

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

      if (!page) option = { ...option, page: 1 };

      if (limit) option = { ...option, limit: Number(limit) };

      if (page)
        option = {
          ...option,
          skip: Number(limit) * Number(page) - Number(limit),
        };

      const { docs, ...rest } = await PostModel.paginate(option);
      const postsTransformed = PostTransformer.list(docs);
      res.status(200).json({ posts: postsTransformed, metaData: rest });
    } catch (err) {
      console.log(err, "err");
      next(err);
    }
  }

  static async getPost(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug } = req.params;
      const post = await PostModel.findOne(slug);

      if (!post)
        throw { name: "NotFound", code: 404, message: "Post not found" };

      const postTransformed = PostTransformer.detail(post);
      res.status(200).json(postTransformed);
    } catch (err) {
      next(err);
    }
  }

  static async searchPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const { q } = req.query;

      if (!q) throw { code: 400, name: "BadRequest", message: "q is required" };

      const index = algolia.initIndex("posts");
      const { hits } = await index.search(String(q));
      const posts = hits.map((hit) => {
        const { _highlightResult, objectID, ...rest } = hit;
        return rest;
      });

      res.status(200).json(posts);
    } catch (err) {
      next(err);
    }
  }
}

export default PostController;
