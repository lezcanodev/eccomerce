import { Entity, BaseEntity, PrimaryColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import Product from './product.entity';
import Role from './role.entity';

@Entity({
    name: 'user'
})
export default class User extends BaseEntity{
    
    @PrimaryColumn()
    id: number

    @Column({
        name: 'rol_id',
        select: false
    })
    rolId: number

    @Column({
        name: 'nick'
    })
    nick: string

    @Column()
    email: string

    @Column({
        name: 'password_hash',
        select: false
    })
    passwordHash: string

    @Column({
        name: 'create_at'
    })
    createAt: string

    @Column({
        name: 'modified_at'
    })
    modifiedAt: string


    @OneToMany(() => Product, (product) => product.user)
    products: Product[]


    @ManyToOne(() => Role, (rol) => rol.users)
    @JoinColumn({
        name: 'rol_id'
    })
    rol: Role
}