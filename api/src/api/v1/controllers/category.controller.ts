import { NextFunction, Request, Response } from "express";
import AppDataSource from "../../../database";
import Category from "../../../entities/category.entity";
import DataTypesHelper from "../../../helpers/dataTypes.helper";

export default class CategoryController{

    public static async get(req: Request, res: Response, next: NextFunction){
        try{
            const ctgId = Number(req.params.categoryId);
            
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
            const { name, parent } = req.body;

            const newCategory = new Category();

            newCategory.name = name;

            if(parent){
                newCategory.parentId = parent;
            }
            
            
            await newCategory.save();

            res.json({msg: 'store new cateogry'});
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
                res.json({msg: 'failed update category'});
                return;
            }

            category.name = name;

            if(parent){
                category.parentId = parent;
            }
            
            await category.save();

            res.json({msg: 'update cateogry'});
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
                    
            res.json({msg: 'remove cateogry'});
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

    public static async getByLevel(req: Request, res: Response, next: NextFunction){
        try{
            let  parent: number | null =  DataTypesHelper.stringToNumber(req.query.parent, {
                negative: false,
                default: -1
            });
            if(parent == -1) parent = null;
            
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

    public static async getTreeComplete(req: Request, res: Response, next: NextFunction){
        try{
            const categories = await Category.getTreeCategories();
            res.json({categories});
        }catch(err){
            next(err);
        }
    }
}