import { NextFunction, Request, Response } from "express";

export const verifyCSFR = (req: Request, res: Response, next: NextFunction) => {
    //preflight request
    if(req.method === 'OPTIONS' || req.method === 'GET'){
        next();
        return;
    }
    
    if( typeof req.cookies._csfr === 'undefined' ||
        typeof req.body._csfr === 'undefined' ||
        req.cookies._csfr !== req.body._csfr){
       next(new Error(`The token is invalid!! - verify csfr -> ${req.cookies._csfr , req.body._csfr}`));
       return;
    }
    
    delete req.body._csfr;

    next();
}