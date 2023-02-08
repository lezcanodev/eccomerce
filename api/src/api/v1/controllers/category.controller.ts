import { NextFunction, Request, Response } from "express";
import AppDataSource from "../../../database";
import Category from "../../../entities/category.entity";

export default class CategoryController{

    public static async getAll(req: Request, res: Response, next: NextFunction){
        try{
            
            const categories = await AppDataSource.createQueryBuilder(Category, 'ctg')
                                .getMany();
                                
            res.json({categories});
        }catch(err){
            next(err);
        }
    }

    public static async getByLevel(req: Request, res: Response, next: NextFunction){
        try{
            let  parent: number | null = Number(req.query.parent) || null;
        
            let query = AppDataSource.createQueryBuilder(Category, 'ctg');
            if(parent){
                query.where('ctg.parent_id = :parent', {parent});
            }else{
                query.where('ctg.parent_id IS NULL');
            }

            const categories = await query.getMany();

            res.json({categories});
        }catch(err){
            next(err);
        }
    }

    public static async getTree(req: Request, res: Response, next: NextFunction){
        try{
            const categories = await Category.getTreeCategories();
            res.json({categories});
        }catch(err){
            next(err);
        }
    }
}