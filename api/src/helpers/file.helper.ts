import STORAGES from "../config/files";
import formidable from "formidable";
import fs from 'fs';
import { nanoid } from "nanoid";
import { promisify } from "util";
import path from "path";

const fsWritePromise = promisify(fs.rename);

export default class FileHelper{

    public static async upload(storageName: string, files: formidable.File[]): Promise<string[]>{

        const toPath =  STORAGES[storageName]?.path;

        if(!toPath){
            throw new Error(`Upload files to "${toPath}" - ERROR`);
        }

        const nameUploadFiles: string[] = [];
   
        for(let i=0; i < files.length; i++){

            const file: formidable.File = files[i] as formidable.File;
            const tempPath = file.filepath;
            const newFileName = `${nanoid()}.${file.mimetype?.split('/')[1]}`;
            const newPathFile = path.join(toPath, newFileName);
            
            await fsWritePromise(tempPath, newPathFile);
            
            nameUploadFiles.push(newFileName);
        }

        return nameUploadFiles;
    }

    public static async remove(storageName: string, nameFiles: string[]): Promise<void>{

        const storagePath =  STORAGES[storageName]?.path;

        if(!storagePath){
            throw new Error(`Remove files to "${storagePath}" - ERROR`);
        }

        for(let i=0; i < nameFiles.length; i++){
            const nameFile: string | undefined = nameFiles[i];
            if(!nameFile) continue;
            const filePath = path.join(storagePath, nameFile);

            fs.stat(filePath, (err) => {
                if(err) return;
            
                fs.unlink(filePath, (err) => {
                    if(err) return;
                });

            });

        }

    }

    public static getUrlImage(imageName: string): string{
        return `${process.env.BASE_URL}uploads/${imageName}`;
    }

}