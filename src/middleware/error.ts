import { Response, Request, NextFunction } from "express";

export class HttpError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

const errorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.statusCode) {
    res.status(err.statusCode).json({ msg: err.message });
  } else {
    res.status(404).json({ msg: err.message });
  }
};

export default errorHandler;
