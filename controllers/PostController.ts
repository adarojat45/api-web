import { NextFunction, Request, Response } from "express";
import PostModel from "../models/PostModel";
import PostTransformer from "../transformers/PostTransformer";

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
}

export default PostController;
