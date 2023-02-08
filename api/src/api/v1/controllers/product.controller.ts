import { NextFunction, Request, Response } from "express";
import AppDataSource from "../../../database";
import Product from "../../../entities/product.entity";
import ProductImage from "../../../entities/productImage.entity";
import FileHelper from "../../../helpers/file.helper";
import { nanoid } from 'nanoid';

export default class ProductController{

    public static async get(req: Request, res: Response, next: NextFunction){
        try{
            const products = await AppDataSource.manager.createQueryBuilder(Product, 'product')
                                    .select([
                                        'product.id',
                                        'product.title',
                                        'product.price',
                                        'product.modifiedAt',
                                        'category.name',
                                        'user.nick', 'user.id',
                                        'image.image'
                                    ])
                                    .leftJoin('product.category', 'category')
                                    .leftJoin('product.user', 'user')
                                    .leftJoin('product.images', 'image')
                                    .getMany();
            res.json({products});
        }catch(err){
            next(err);
        }
    }


    public static async store(req: Request, res: Response, next: NextFunction){
        try{

            let newProduct = new Product();
            const { title, description , price, categoryId} = req.body;
            
            newProduct.id = nanoid();
            newProduct.userId = req.body.payload.userId;
            newProduct.title = title;
            newProduct.categoryId = categoryId;
            newProduct.price = price;
            if(description) newProduct.description = description;

            console.log(newProduct);
            newProduct = await newProduct.save();

            const fileNames: string[] = await FileHelper.upload('public', req.body.files['images']);
            const values: any[] = [];
            
            fileNames.forEach(fileName => {
                values.push({
                    productId: newProduct.id,
                    image: fileName
                });
            });

            await AppDataSource.createQueryBuilder()
                    .insert()
                    .into(ProductImage)
                    .values(values)
                    .execute();

            res.json({msg:"strore product - ok"});
        }catch(err){
            next(err);
        }
    }
}