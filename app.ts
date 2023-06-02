import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();
const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: `server is running on port` });
});

export default app;
