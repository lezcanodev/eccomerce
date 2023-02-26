import { NextFunction, Request, Response } from "express";
import { StoreProductValidate } from "./ajv/product.ajv";

export default class ProductValidator{
    public static store = async (req: Request, res: Response, next: NextFunction) => {
        try{
            await StoreProductValidate(req.body);
            next();
        }catch(err){
            next(err);
        }
    }
}