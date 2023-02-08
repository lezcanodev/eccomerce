import { Entity, BaseEntity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import User from './user.entity';


@Entity({
    name: 'role'
})
export default class Role extends BaseEntity{
    
    @PrimaryColumn()
    id: number

    @Column({
        name: 'name'
    })
    name: string

    @OneToMany(() => User, (user) => user.rol)
    users: User[]
}