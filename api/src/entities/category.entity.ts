import { Entity, BaseEntity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import AppDataSource from '../database';
import Product from './product.entity';

@Entity({
    name: 'category'
})
export default class Category extends BaseEntity{
    
    @PrimaryColumn()
    id: number

    @Column({
        name: 'name'
    })
    name: string

    @Column({
        name: 'parent_id'
    })
    parentId: number

    @OneToMany(() => Product, (product) => product.category)
    products: Product[]


    public static async getTreeCategories(level?: number): Promise<Category[]>{
        const rawCategories: Category[] = await AppDataSource.manager.createQueryBuilder(this, 'ctg')
                                .getMany();
        
        const roots: Category[] = (rawCategories.filter(c => c.parentId === null)).reverse();
        const treeCategories: Category[] = [];

        const getChildrenRoot = (
            current: Category | undefined,
            ref: any,
            child = false
        ) => {
            
            const children: Category[] = rawCategories.filter(c => c.parentId === current?.id)
            let node;

            if(!child){
                node = {
                    id: current?.id,
                    name: current?.name,
                    children:[]
                }
            }else{
                node = ref;
            }
            
            for(let i=0; i<children.length; i++){   
                const node2 = {
                    id: children[i]?.id,
                    name: children[i]?.name,
                    children: []
                }

                getChildrenRoot(children[i], node2, true);
                node.children.push(node2);
            }
            
            if(!child) treeCategories.push(node);

        }

        while(roots){
            const current = roots.pop();
            if(!current) break;
            getChildrenRoot(current, treeCategories);
        }

        return treeCategories;
    }
}