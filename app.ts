import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import router from "./routes/index";
import mongoConnect from "./config/mongoConnect";

const app: Express = express();
const PORT = process.env.PORT;

app.use(cors<Request>());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

app.get("/", (_: Request, res: Response) => {
  res.status(200).json({ message: `server is running on port ${PORT}` });
});

mongoConnect()
  .then((data) => {
    app.listen(PORT, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
    });
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
