import { Router } from "express";
import AuthValidator from "../validators/auth.validator";
import AuthController from "../controllers/auth.controller";
const authRouter = Router();

authRouter.post('/signup', AuthValidator.signup, AuthController.signup);
authRouter.post('/signin', AuthValidator.signin, AuthController.signin);

export default authRouter;