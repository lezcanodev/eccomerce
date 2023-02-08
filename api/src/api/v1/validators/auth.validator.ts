import { NextFunction, Request , Response } from "express";
import { authSignupValidate, authSigninValidate } from "./ajv/auth.ajv";

export default class AuthValidator{
    public static signup = async (req: Request, res: Response, next: NextFunction) => {
        try{
            await authSignupValidate(req.body);
            next();
        }catch(err){
            next(err);
        }
    }

    public static signin = async (req: Request, res: Response, next: NextFunction) => {
        try{
            await authSigninValidate(req.body);
            next();
        }catch(err){
            next(err);
        }
    }
}