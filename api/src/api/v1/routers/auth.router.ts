import { Router } from "express";
import AuthValidator from "../validators/auth.validator";
import AuthController from "../controllers/auth.controller";
import { isAuthMiddleware } from "../middlewares/auth.middleware";
const authRouter = Router();

authRouter.post('/signup', AuthValidator.signup, AuthController.signup);
authRouter.post('/signin', AuthValidator.signin, AuthController.signin);
authRouter.get('/logout', isAuthMiddleware, AuthController.logout);


export default authRouter;