import { Router } from 'express';
import { isAuthMiddleware } from '../middlewares/auth.middleware';
import ProductValidator from '../validators/product.validator';
import ProductController from '../controllers/product.controller';
import parseFormData from '../middlewares/parseFormData';

const productRouter = Router();


productRouter.get('/partial', ProductController.getPartial);
productRouter.get('/:productId', ProductController.get);
productRouter.get('/change-state/:productId', 
    isAuthMiddleware,
    ProductController.changeState);

productRouter.post('/', 
    isAuthMiddleware,
    parseFormData({
        multiples: true
    }),
    ProductValidator.store,
    ProductController.store
);

productRouter.put('/', 
    isAuthMiddleware,
  /*  hasPermissionMiddleware({
        action: Permission.edit,
        model: Product
    })*/
    parseFormData({
        multiples: true
    }),
    ProductValidator.store,
    ProductController.update
);

productRouter.delete('/',
    isAuthMiddleware,
    ProductController.delete
);


export default productRouter;