import express from "express";
import { check } from "express-validator";

import { register, login } from "../controllers/auth";

const router = express.Router();

const PASSWORD_MIN_LENGTH = 6;

router.get(
  "/register",
  [
    check("email", "Incorrect email").isEmail(),
    check(
      "password",
      `password must contain at least ${PASSWORD_MIN_LENGTH} characters`
    ).isLength({ min: PASSWORD_MIN_LENGTH }),
  ],
  register
);
router.get(
    "/login", 
    [
        check("email", "Incorrect email").normalizeEmail().isEmail(),
        check("password", "Enter password").exists()
    ],
    login);

export default router;
