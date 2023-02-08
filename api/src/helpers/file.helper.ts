import STORAGES from "../config/files";
import formidable from "formidable";
import fs from 'fs';
import { nanoid } from "nanoid";
import { promisify } from "util";

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
            const newPathFile = `${toPath}\\${newFileName}`;

            await fsWritePromise(tempPath, newPathFile);
            
            nameUploadFiles.push(newFileName);
        }

        return nameUploadFiles;
    }
}