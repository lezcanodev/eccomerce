import { NextFunction, Request, Response } from "express";
import AppDataSource from "../../../database";
import Category from "../../../entities/category.entity";
import DataTypesHelper from "../../../helpers/dataTypes.helper";

export default class CategoryController{

    public static async get(req: Request, res: Response, next: NextFunction){
        try{
            const ctgId = DataTypesHelper.parseNumber(req.params.categoryId,{
                default: 0,
                negative: false
            });
            
            if(!ctgId){
                res.json({});
                return;
            }

            const category = await AppDataSource.createQueryBuilder(Category, 'ctg')
                                .where(`ctg.id = :id`,{
                                    id: ctgId
                                })
                                .getOne();
                                
            res.json({...category});
        }catch(err){
            next(err);
        }
    }

    public static async getAll(req: Request, res: Response, next: NextFunction){
        try{
            const { format } = req.query;

            if(format && format === 'tree'){
                CategoryController.getTreeComplete(req, res, next);
                return;
            }

            const categories = await AppDataSource.createQueryBuilder(Category, 'ctg')
                                .getMany();
                                
            res.json({data: categories});
        }catch(err){
            next(err);
        }
    }

    
    public static async store(req: Request, res: Response, next: NextFunction){
        try{
            const { name, parentId } = req.body;

            const newCategory = new Category();

            newCategory.name = name;

            if(parentId){
                newCategory.parentId = parentId;
            }
            
            await newCategory.save();

            res.json({message: 'success'});
        }catch(err){
            next(err);
        }
    }


    public static async update(req: Request, res: Response, next: NextFunction){
        try{
            const { name, parent, categoryId } = req.body;

            const category = await AppDataSource.manager   
                                .createQueryBuilder(Category, 'ctg')
                                .where(`ctg.id = :ctgId`, {
                                    ctgId: Number(categoryId)
                                })
                                .getOne();
                    
            if(!category){
                res.json({error: 'failed update category'});
                return;
            }

            category.name = name;

            if(parent){
                category.parentId = parent;
            }
            
            await category.save();

            res.json({message: 'success'});
        }catch(err){
            next(err);
        }
    }

    public static async delete(req: Request, res: Response, next: NextFunction){
        try{
            const { categoryId } = req.params;
    
            await AppDataSource.manager   
                                .createQueryBuilder()
                                .delete()
                                .from(Category)
                                .where('id = :categoryId', {
                                    categoryId: Number(categoryId)
                                })
                                .execute();
                    
            res.json({message: 'success'});
        }catch(err){
            next(err);
        }
    }

    public static async getAllWithInfo(req: Request, res: Response, next: NextFunction){
        try{
            const categories = await AppDataSource.createQueryBuilder(Category, 'ctg')
                                .loadRelationCountAndMap('ctg.totalProducts', 'ctg.products')                    
                                .getMany();
                                
            res.json({data: categories});
        }catch(err){
            next(err);
        }
    }

    public static async getTreeComplete(req: Request, res: Response, next: NextFunction){
        try{
            const categories = await Category.getTreeCategories();
            res.json({data:categories});
        }catch(err){
            next(err);
        }
    }
}