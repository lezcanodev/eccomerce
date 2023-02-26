import * as dotenv from 'dotenv';
dotenv.config();

import express, { Application, NextFunction, Request, Response } from 'express';
import AppDataSource from './database';
import appRouter from './api';
import cookieParser from 'cookie-parser';
import path from 'path';
const app: Application = express(); 

//Middlewares
app.use(express.static(path.join(__dirname,'..', 'public')));
app.use(cookieParser());
app.use(express.json());

//Router
app.use(appRouter);

//Error Handling
app.use((err: Error , req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({error: 'Internal Server Error'});
});

const start = async (): Promise<void> => {
    try{
        await AppDataSource.initialize();

        app.listen(process.env.PORT || 3002, function(){
            console.log('Server running...')
        });
    }catch(err){
        console.log('Application Error!!', err);
    }
}
start();