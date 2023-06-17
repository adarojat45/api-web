import { Router } from "express";
import PostController from "../controllers/PostController";

const postRouter = Router();

postRouter.get("/", PostController.getPosts);

export default postRouter;
