import { Router } from "express";
import AuthValidator from "../validators/auth.validator";
import AuthController from "../controllers/auth.controller";
import { isAuthMiddleware } from "../middlewares/auth.middleware";
import { verifyCSFR } from "../middlewares/verifyCsfr";
const authRouter = Router();

authRouter.post('/signup', 
                verifyCSFR,
                AuthValidator.signup, 
                AuthController.signup);

authRouter.post('/signin',
                verifyCSFR,
                AuthValidator.signin, 
                AuthController.signin);

authRouter.get('/logout', 
                isAuthMiddleware(), 
                AuthController.logout);


export default authRouter;