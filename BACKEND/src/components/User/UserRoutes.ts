import { Router } from "express";
import multer from "multer";
import { UserController } from "./UserController";

const userController = new UserController();
const userRouter = Router();
const upload = multer({ dest: "uploads/" });

userRouter.post(
  "/agregar",
  upload.single("file"),
  userController.agregarUsuarios
);

export default userRouter;
