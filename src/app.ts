import express, { Request, Response } from "express";

import path from "path";
import { NextFunction } from "express";
import users from "./routes/users";
import posts from "./routes/posts";
import logger from "./middleware/logger";
import errorHandler, { HttpError } from "./middleware/error";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(logger);

// Routes
app.use("/api/users", users);
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
