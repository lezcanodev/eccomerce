import { ValidationError } from "ajv";
import  AjvHelper from "./validators/ajv/helper";
import cors from 'cors';
import { Router,
    Request,
    Response,
    NextFunction } from "express";
import authRouter from "./routers/auth.router";
import userRouter from "./routers/user.router";
import productRouter from "./routers/product.router";
import categoryRouter from "./routers/category.router";
const router = Router();



router.use((req: Request, res: Response, next: NextFunction) => {
    //console.log(req.method, req.url);
    next();
});


router.use(cors({
    origin: 'http://localhost:3000',
    allowedHeaders: 'Origin,X-Requested-With,Content-Type',
    credentials: true,
    methods: ['OPTIONS', 'GET', 'POST', 'PUT', 'DELETE']
}));

//Routers
router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/product', productRouter);
router.use('/category', categoryRouter);

//Not found page
router.use((req: Request, res: Response, next: NextFunction) => {
    res.json({msg: 'Resource not found'});
});

router.use((err: Error , req: Request, res: Response, next: NextFunction) => {
    console.log(err.message ,'=> HANDLE ERROR ROUTER V1 <=');

    if(err instanceof ValidationError){
        res.json({errors: AjvHelper.parseAjvErrors(err)});
        return;
    }

    res.json({error: err.message});
});


export default router;