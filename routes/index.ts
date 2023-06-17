import { Router } from "express";
import errorHandler from "../middlewares/errorHandler";
import categoryRouter from "./categoryRouter";
import postRouter from "./postRouter";

const router = Router();

router.use("/categories", categoryRouter);
router.use("/posts", postRouter);

router.use(errorHandler);

export default router;
