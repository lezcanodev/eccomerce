import { NextFunction, Request, RequestHandler, Response } from "express";
import formidable from 'formidable';
import path from "path";

export default function parseFormData(formidableOptions: formidable.Options = {}): RequestHandler {
    
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
                
                const parseFiles: any = {};
                
                for(let file in files){

                    if(!(files[file] instanceof Array)){
                        parseFiles[file] = [files[file]];
                    }else{
                        parseFiles[file] = files[file];
                    }

                    parseFiles[file] = parseFiles[file].filter((fl: File) => (
                        (fl.size > 0)
                    ));
                }
                
                req.body = {
                    ...req.body,
                    ...fields,
                    files: parseFiles
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