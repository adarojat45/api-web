import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app: Express = express();

app.use(cors<Request>());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (_: Request, res: Response) => {
  res.status(200).json({ message: `server is running on port` });
});

export default app;
