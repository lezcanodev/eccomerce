import { NextFunction, Request, Response } from "express";
import AppDataSource from "../../../database";
import Product from "../../../entities/product.entity";
import ProductImage from "../../../entities/productImage.entity";
import FileHelper from "../../../helpers/file.helper";
import { nanoid } from 'nanoid';
import DataTypesHelper from "../../../helpers/dataTypes.helper";


export default class ProductController{
    private static readonly PRODUCTS_PER_PAGE: number = 25;

    public static async getPartial(req: Request, res: Response, next: NextFunction){
        try{
            
           const page: number = DataTypesHelper.stringToNumber(req.query.page,{
                negative: false,
                default: 1
            });
            
            let query = AppDataSource.manager
                                    .createQueryBuilder(Product, 'product')
                                    .select([
                                        'product.id',
                                        'product.active',
                                        'product.title',
                                        'product.price',
                                        'product.createAt',
                                        'product.modifiedAt',
                                        'category.name', 'category.id',
                                        'user.nick', 'user.id',
                                        `image.image`
                                    ])
                                    .leftJoin('product.category', 'category')
                                    .leftJoin('product.user', 'user')
                                    .leftJoin('product.images', 'image');
                                    
            if(req.query.category){
                query.andWhere('(product.categoryId = :category OR category.parentId = :category)',{
                    category: Number(req.query.category)
                });
            }

            if(req.query.query){
                query.andWhere('(product.title ILIKE :query OR product.description ILIKE :query )',{
                    query: `%${req.query.query}%`
                });
            }
          
            const totalProducts: number = (await query.clone()
                                        .select(['count(*) as totalProducts'])
                                        .getRawOne()).totalproducts;

            let products = await query.orderBy('product.createAt', 'DESC')
                                    .take(ProductController.PRODUCTS_PER_PAGE)
                                    .skip(ProductController.PRODUCTS_PER_PAGE*(page-1))
                                    .getMany();

            products = products.map(product => {
                product.images = product.images.map(image => {
                    image.image = FileHelper.getUrlImage(image.image);
                    return image;
                });

                return product;
            });

            const totalPages: number = Math.ceil(totalProducts/ProductController.PRODUCTS_PER_PAGE);

            res.json({
                totalProducts,
                totalPages,
                data: products
            });

        }catch(err){
            next(err);
        }
    }

    public static async get(req: Request, res: Response, next: NextFunction){
        try{
            const productId = req.params.productId;

            let product = await AppDataSource.manager
                                    .createQueryBuilder(Product, 'product')
                                    .select([
                                        'product.id',
                                        'product.active',
                                        'product.title',
                                        'product.price',
                                        'product.description',
                                        'product.createAt',
                                        'product.modifiedAt',
                                        'category.name', 'category.id',
                                        'user.nick', 'user.id',
                                        `image.image`
                                    ])
                                    .leftJoin('product.category', 'category')
                                    .leftJoin('product.user', 'user')
                                    .leftJoin('product.images', 'image')
                                    .where('product.id = :productId', {productId})
                                    .getOne();

            if(product && product.images){
                product.images = product.images.map(image => {
                    image.image = FileHelper.getUrlImage(image.image);
                    return image;
                });
            }

            res.json({...product});

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
            
            newProduct = await newProduct.save();

            const fileNames: string[] = await FileHelper.upload('public', req.body.files['images']);
            await ProductImage.saveImages(fileNames, newProduct.id);

            res.json({msg:"strore product - ok"});
        }catch(err){
            next(err);
        }
    }


    public static async update(req: Request, res: Response, next: NextFunction){
        try{
            
            const productId = req.body.product;
            const userId = req.body.payload.userId;
            const product = await AppDataSource.manager
                            .createQueryBuilder(Product, 'product')
                            .where('product.userId = :userId AND product.id = :productId',
                                   {userId, productId})
                            .getOne();
            
            if(!product){
                res.json({msg:"Unathorized"});
                return;
            }

            const { title, description , price, categoryId} = req.body;

            product.title = title;
            product.categoryId = categoryId;
            product.price = price;
            
            if(description) product.description = description;
            
            await product.save();

            const removeImages: string[] = req.body['remove-images'];

            if(removeImages){
                    await FileHelper.remove('public', removeImages);
                    await ProductImage.removeImages(removeImages, productId);
            }

            const fileNames: string[] = await FileHelper.upload('public', req.body.files['images']);
            await ProductImage.saveImages(fileNames, productId);

            res.json({msg:"update product - ok"});
        }catch(err){
         
            next(err);
        }
    }

    public static async delete(req: Request, res: Response, next: NextFunction){
        try{
            const productId = req.query.product;
            const userId = req.body.payload.userId;

            const product = await AppDataSource.manager
                             .createQueryBuilder(Product, 'p')
                             .addSelect('images.image')
                             .leftJoin('p.images', 'images')
                             .where('p.userId = :userId AND p.id = :productId', {
                                userId, productId
                             })
                             .getOne();

            if(!product){
                res.json({msg: 'Product not exist'});
                return;
            }

            const deleteImages: string[] = product.images.map(({image}) => image);
            FileHelper.remove('public', deleteImages);

            await Product.remove(product);

            res.json({msg: 'OK - deleted'});

        }catch(err){
            next(err);
        }
    }


    public static async changeState(req: Request, res: Response, next: NextFunction){
        try{
            const productId = req.params.productId;
            const userId = req.body.payload.userId;

            const product = await AppDataSource.manager
                                .createQueryBuilder(Product, 'p')
                                .where('p.userId = :userId AND p.id = :productId', {
                                    userId, productId
                                })
                                .getOne();
            if(!product){
                res.json({msg: 'OK - not change state '});
                return;
            }
            product.active = !product.active;
 
            await product.save();

            res.json({msg: 'OK - change state'});

        }catch(err){
            next(err);
        }
    }

}