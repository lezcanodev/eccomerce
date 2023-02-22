import { Router } from "express";
import CategoryController from "../controllers/category.controller";
import { isAuthMiddleware } from "../middlewares/auth.middleware";
import CategoryValidator from "../validators/category.validator";
const categoryRouter = Router();


categoryRouter.get('/', CategoryController.getAll);
categoryRouter.get('/info', CategoryController.getAllWithInfo);
categoryRouter.get('/:categoryId', CategoryController.get);

categoryRouter.delete('/:categoryId', 
isAuthMiddleware,
CategoryController.delete);

categoryRouter.post('/', 
isAuthMiddleware,
CategoryValidator.store,
CategoryController.store);


categoryRouter.put('/', 
isAuthMiddleware,
CategoryValidator.update,
CategoryController.update);

export default categoryRouter;