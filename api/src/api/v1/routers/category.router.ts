import { Router } from "express";
import CategoryController from "../controllers/category.controller";
import { isAuthMiddleware } from "../middlewares/auth.middleware";
import { verifyCSFR } from "../middlewares/verifyCsfr";
import CategoryValidator from "../validators/category.validator";
const categoryRouter = Router();


categoryRouter.get('/', 
                   CategoryController.getAll);

categoryRouter.get('/info',
                   CategoryController.getAllWithInfo);

categoryRouter.get('/:categoryId', 
                    CategoryController.get);

categoryRouter.delete('/:categoryId',
                      verifyCSFR,
                      isAuthMiddleware(),
                      CategoryController.delete);

categoryRouter.post('/',
                    verifyCSFR, 
                    isAuthMiddleware(),
                    CategoryValidator.store,
                    CategoryController.store);


categoryRouter.put('/',
                   verifyCSFR,
                   isAuthMiddleware(),
                   CategoryValidator.update,
                   CategoryController.update);

export default categoryRouter;