import { Router } from "express";
import PostController from "../controllers/PostController";

const postRouter = Router();

postRouter.get("/", PostController.getPosts);
postRouter.get("/:slug", PostController.getPost);

export default postRouter;
