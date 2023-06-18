import app from "../app";
import { mongoConnect } from "../config/mongoose";

const PORT = process.env.PORT;

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
