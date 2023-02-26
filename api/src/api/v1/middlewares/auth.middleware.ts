import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from 'jsonwebtoken';

interface IIsAuthMiddlewareConfig{
    required : boolean
}

export const isAuthMiddleware = (config ?: IIsAuthMiddlewareConfig): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {
        try{

            const { token } = req.cookies;
            const verified = jwt.verify(token, String(process.env.JWT_SECRET_KEY), { complete: true } );
            
            req.body.payload = verified.payload;
    
            next();
        }catch(err){
            if(!config?.required){
                next();
                return;
            }

            next(err);
            return;
        }
    }
}

