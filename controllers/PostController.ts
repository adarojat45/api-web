import { NextFunction, Request, Response } from "express";
import PostModel from "../models/PostModel";
import PostTransformer from "../transformers/PostTransformer";
import algolia from "../services/algolia";

class PostController {
  static async getPosts(_: Request, res: Response, next: NextFunction) {
    try {
      const posts = await PostModel.findAll();
      const postTransformed = PostTransformer.list(posts);
      res.status(200).json(postTransformed);
    } catch (err) {
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
