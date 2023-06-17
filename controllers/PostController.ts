import { NextFunction, Request, Response } from "express";
import PostModel from "../models/PostModel";

class PostController {
  static async getPosts(_: Request, res: Response, next: NextFunction) {
    try {
      const posts = await PostModel.findAll();
      res.status(200).json(posts);
    } catch (err) {
      next(err);
    }
  }
}

export default PostController;
