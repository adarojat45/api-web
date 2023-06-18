import { Router } from "express";
import PostController from "../controllers/PostController";

const postRouter = Router();

postRouter.get("/", PostController.getPosts);
postRouter.get("/search", PostController.searchPosts);
postRouter.get("/:slug", PostController.getPost);

export default postRouter;
