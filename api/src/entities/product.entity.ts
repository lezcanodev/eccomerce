import {Entity, BaseEntity, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import Category from './category.entity';
import ProductImage from './productImage.entity';
import User from './user.entity';

@Entity({
    name: 'product'
})
export default class Product extends BaseEntity{
    
    @PrimaryColumn()
    id: string

    @Column({
        name: 'user_id',
        select: false
    })
    userId: number

    @Column({
        name: 'category_id',
        select: false
    })
    categoryId: string

    @Column({
        name: 'title'
    })
    title: string

    @Column({
        name: 'description'
    })
    description: string

    @Column({
        name: 'price'
    })
    price: string

    @Column({
        name: 'create_at'
    })
    createAt: string

    @Column({
        name: 'modified_at'
    })
    modifiedAt: string


    @ManyToOne(() => Category, (category) => category.products)
    @JoinColumn({
        name: 'category_id'
    })
    category: Category

    @ManyToOne(() => User, (user) => user.products)
    @JoinColumn({
        name: 'user_id'
    })
    user: User

    @OneToMany(() => ProductImage, (pi) => pi.product)
    images: ProductImage[]

}