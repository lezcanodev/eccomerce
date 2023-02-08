import { Entity, BaseEntity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import Product from './product.entity';

@Entity({
    name: 'product_image'
})
export default class ProductImage extends BaseEntity{
    
    @PrimaryColumn({
        name: 'product_id'
    })
    productId: number

    @PrimaryColumn({
        name: 'image'
    })
    image: string


    @ManyToOne(() => Product, (p) => p.images)
    @JoinColumn({
        name: 'product_id'
    })
    product: Product
}