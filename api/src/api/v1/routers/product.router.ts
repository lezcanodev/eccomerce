import { Router } from 'express';
import { isAuthMiddleware } from '../middlewares/auth.middleware';
import ProductValidator from '../validators/product.validator';
import ProductController from '../controllers/product.controller';
import parseFormData from '../middlewares/parseFormData';

const productRouter = Router();

productRouter.get('/', ProductController.get);
productRouter.post('/', 
    isAuthMiddleware,
    parseFormData({
        multiples: true
    }),
    ProductValidator.store,
    ProductController.store
);

export default productRouter;