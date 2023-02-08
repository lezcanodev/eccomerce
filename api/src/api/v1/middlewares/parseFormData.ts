import { NextFunction, Request, RequestHandler, Response } from "express";
import formidable from 'formidable';
import path from "path";

export default function parseFormData (formidableOptions: formidable.Options = {}): RequestHandler {
    
    return (req: Request, res: Response, next: NextFunction) => {
        try{
            const contentType = req.headers['content-type'] ?? '';
            if(!contentType.startsWith('multipart/form-data;')){
                next();
                return;
            }
    
            const form = formidable({
                ...formidableOptions,
                uploadDir: path.join(__dirname,'temp')
            });
    
            form.parse(req, (err, fields, files) => {
                if(err){
                    next(err);
                    return;
                }
    
                req.body = {
                    ...req.body,
                    ...fields,
                    files: files
                };            
            });
    
            form.once('end', () => {
                next();
            });
            
        }catch(err){
            next(err);
        }
    };
};