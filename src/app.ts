import express, { Request, Response, NextFunction } from "express";
import path from "path";
import mongoose from "mongoose";

import config from './config';
import auth from "./routes/auth";
import posts from "./routes/posts";
import logger from "./middleware/logger";
import errorHandler, { HttpError } from "./middleware/error";

const app = express();
const port = process.env.PORT;

const uri = `mongodb+srv://${config.dbUserName}:${config.dbPassword}@cluster0.zqvuhhm.mongodb.net/${config.dbName}?retryWrites=true&w=majority&appName=Cluster0`;
mongoose
  .connect(uri)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Database connection error: ", err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(logger);
app.use((req: Request, res: Response, next: NextFunction) => {
  res.cookie("cookieName", "cookieValue", { maxAge: 900000, httpOnly: true });
  next();
});

// Routes
app.use("/api/auth", auth);
app.use("/api/posts", posts);

app.get("/download", (req: Request, res: Response) => {
  res.download(path.join(__dirname, "../public/images/logo.svg"));
});

app.get("/redirect", (req: Request, res: Response) => {
  res.redirect("https://www.google.com");
});

app.route("/test").get((req: Request, res: Response, next: NextFunction) => {
  const error = new HttpError("Test error", 500);
  next(error);
});

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new HttpError("Not Found", 404);
  next(error);
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
