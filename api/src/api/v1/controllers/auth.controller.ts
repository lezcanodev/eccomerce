import { NextFunction, Request , Response } from "express";
import AppDataSource from "../../../database";
import User from "../../../entities/user.entity";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { RoleEnum } from "../../../enums/role.enum";


export default class AuthController{
    private static readonly SALT_ROUNDS: number = 10;

    public static signup = async (req: Request, res: Response, next: NextFunction) => {
        try{
    
            const passwordHash: string = await bcrypt.hash(req.body.password, AuthController.SALT_ROUNDS);
    
            const newUser = new User();
    
            newUser.email = req.body.email;
            newUser.nick = req.body.nick;
            newUser.passwordHash = passwordHash;
            newUser.rolId = RoleEnum.USER;
            
            await newUser.save();
    
            res.send({msg: 'ok'});
        }catch(err){
            next(err);
        }
    }

    public static signin = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const nickOrEmail: string = req.body.nickOrEmail;
            const password: string = req.body.password;
            const user = await AppDataSource.manager.createQueryBuilder(User, 'user')
                                .select([
                                'user.passwordHash', 
                                'user.nick',
                                'user.id'])
                                .where(`user.nick = :nick`, {
                                    nick: nickOrEmail
                                })
                                .orWhere(`user.email = :email`, {
                                    email: nickOrEmail
                                }).getOne();

            const matchPassword = await bcrypt.compare(password, user?.passwordHash ?? '');

            if(!user || !matchPassword){
                res.json({error:'credential error'});
                return;
            }
        
            const token = await jwt.sign({
                userId: user.id,
                role: "role"
            }, 
            String(process.env.JWT_SECRET_KEY),
            { expiresIn: '24h' });

            res.cookie('token', token, {
                maxAge: 24*60*60*1024,
                path: '/',
                httpOnly: true
            });

            res.send({status: 'success'});

        }catch(err){
            next(err);
        }
    }

    public static logout = async (req: Request, res: Response, next: NextFunction) => {
        try{  
            res.clearCookie('token');
            res.send({status: 'logout'});
        }catch(err){
            next(err);
        }
    }
}


