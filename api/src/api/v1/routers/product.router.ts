import { Router } from 'express';
import { isAuthMiddleware } from '../middlewares/auth.middleware';
import { verifyCSFR } from '../middlewares/verifyCsfr';
import ProductValidator from '../validators/product.validator';
import ProductController from '../controllers/product.controller';
import parseFormData from '../middlewares/parseFormData';

const productRouter = Router();


productRouter.get('/partial', 
                  isAuthMiddleware({required: false}), 
                  ProductController.getPartial);

productRouter.get('/:productId', 
                  ProductController.get);

productRouter.get('/change-state/:productId', 
                  isAuthMiddleware(),
                  ProductController.changeState);

productRouter.post('/', 
                   isAuthMiddleware(),
                   parseFormData({
                       multiples: true,
                       allowEmptyFiles: false
                   }),
                   verifyCSFR,
                   ProductValidator.store,
                   ProductController.store);

productRouter.put('/', 
                  isAuthMiddleware(),
                  parseFormData({
                      multiples: true
                  }),
                  verifyCSFR,
                  ProductValidator.store,
                  ProductController.update);

productRouter.delete('/',
                     isAuthMiddleware(),
                     verifyCSFR,
                     ProductController.delete);


export default productRouter;