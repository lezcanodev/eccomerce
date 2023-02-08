import AppDataSource from "../database"

export interface IEntityExist{
    entity: any,
    column: string
}

export default class EntityHelper{

        public static async exist({
            entity, column
        }: IEntityExist, data: number | string): Promise<boolean>{

            return await AppDataSource.manager
                            .createQueryBuilder(entity, 'temp')
                            .where(`temp.${column} = :val`, {
                                val: data
                            }).getExists();
        }

}