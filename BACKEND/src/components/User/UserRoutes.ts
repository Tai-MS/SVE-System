import express, { NextFunction, Request, Response } from "express";
import userController from "./UserController";
import passport from "../../config/passport";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login", "email"],
  })
);

router.get(
  "/auth/google/callback",
  async (req: Request, res: Response, next: NextFunction) => {
    await userController.loginGoogle(req, res, next);
  }
);

router.get(
  "/getUser",
  async (req: Request, res: Response, next: NextFunction) => {
    await userController.getUser(req, res, next);
  }
);

router.post(
  "/create",
  async (req: Request, res: Response, next: NextFunction) => {
    await userController.createUser(req, res, next);
  }
);

export default router;
