import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export const isAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try{
        const { token } = req.cookies;
        const verified = jwt.verify(token, String(process.env.JWT_SECRET_KEY), { complete: true } );
        
        req.body.payload = verified.payload;

        next();
    }catch(err){
        next(err);
    }
}

