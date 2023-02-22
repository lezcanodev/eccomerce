import { NextFunction, Request, Response } from "express";
import { storeCategoryValidate, updateCategoryValidate } from "./ajv/category.ajv";

export default class CategoryValidator{
    public static async store(req: Request, res: Response, next: NextFunction){
        try{
            await storeCategoryValidate(req.body);
            next();
        }catch(err){
            next(err);
        }
    }


    public static async update(req: Request, res: Response, next: NextFunction){
        try{
            await updateCategoryValidate(req.body);
            next();
        }catch(err){
            next(err);
        }
    }
}