import { Router } from "express";
import errorHandler from "../middlewares/errorHandler";
import categoryRouter from "./categoryRouter";

const router = Router();

router.use("/categories", categoryRouter);

router.use(errorHandler);

export default router;
