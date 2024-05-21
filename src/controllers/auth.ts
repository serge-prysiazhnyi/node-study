import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/auth";
import { HttpError } from "../middleware/error";
import config from "../config";

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array(), msg: "validation error" });
    }

    const { email, password } = req.body;

    const candidate = await User.findOne({ email });

    if (candidate) {
      const error = new HttpError("this email is already registered", 400);
      next(error);
    }

    const hashedPassword = bcrypt.hash(password, 12);
    const newUser = new User({ email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ msg: "user has been registered" });
  } catch (err: unknown) {
    const error = new HttpError((err as Error).message, 500);
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array(), msg: "validation error" });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      const error = new HttpError("User not found", 400);
      next(error);
    }

    const isMatch = user && bcrypt.compare(password, user.password as string);

    if (!isMatch) {
      const error = new HttpError("User not found", 400);
      next(error);
    }

    const token = jwt.sign({ userId: user?.id }, config.jwtSecret, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, userId: user?.id });
  } catch (err: unknown) {
    const error = new HttpError((err as Error).message, 500);
    next(error);
  }
};

export { register, login };
