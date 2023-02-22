import { Entity, BaseEntity, PrimaryColumn, ManyToOne, JoinColumn, Brackets } from 'typeorm';
import AppDataSource from '../database';
import Product from './product.entity';

@Entity({
    name: 'product_image'
})
export default class ProductImage extends BaseEntity{
    
    @PrimaryColumn({
        name: 'product_id'
    })
    productId: string

    @PrimaryColumn({
        name: 'image'
    })
    image: string


    @ManyToOne(() => Product, (p) => p.images)
    @JoinColumn({
        name: 'product_id'
    })
    product: Product


    public static async saveImages(nameImages: string[], productId: string): Promise<void>{
        const values: {productId: string, image: string}[] = [];

        nameImages.forEach(fileName => {
            values.push({
                productId: productId,
                image: fileName
            });
        });

        await AppDataSource.createQueryBuilder()
                .insert()
                .into(ProductImage)
                .values(values)
                .execute();
    }

    public static async removeImages(nameImages: string[], productId: string): Promise<void>{
        const queryRemoveImages = AppDataSource.manager
            .createQueryBuilder()
            .delete()
            .from(ProductImage);
        let params: any = {};
        let whereConditions: string[] = [];

        nameImages.map((image,index) => {
            whereConditions.push(`image = :img${index+1}`);
            params[`img${index+1}`] = image;
        });

        queryRemoveImages.orWhere(new Brackets(query => {
            whereConditions.map(whereCondition => {
                query.orWhere(whereCondition);
            });  
        }), params);


        queryRemoveImages.andWhere('productId = :productId', {productId});

        await queryRemoveImages.execute();
    }
}