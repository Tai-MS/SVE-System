import { Router } from "express";
import { UserController } from "./UserController";

const userController = new UserController();
const userRouter = Router();

userRouter.post("/agregar", userController.agregarUsuarios);

export default userRouter;
