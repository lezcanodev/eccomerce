import { Router } from "express";
import { isAuthMiddleware } from "../middlewares/auth.middleware";
import UserController from "../controllers/user.controller";
const userRouter = Router();

userRouter.get('/', isAuthMiddleware, UserController.get);

export default userRouter;