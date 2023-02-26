import { NextFunction, Request , Response } from "express";
import AppDataSource from "../../../database";
import User from "../../../entities/user.entity";

export default class UserController{

    public static get = async (req: Request, res: Response, next: NextFunction) => {
        try{

            const user: User | null = await AppDataSource.manager.createQueryBuilder(User, 'user')
                            .select([
                                'user.id', 
                                'user.nick',
                                'rol.name'
                            ])
                            .leftJoin('user.rol', 'rol')
                            .where('user.id = :id', {
                                id: req.body.payload.userId
                            })
                            .getOne();

            res.send({user});
        }catch(err){
            next(err);
        }
    }
}


