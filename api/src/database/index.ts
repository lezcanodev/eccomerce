import { DataSource } from "typeorm";
import path from 'path';

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: false,
    entities: [path.join(__dirname,'..','entities/*.entity.{ts, js}')],
    migrations: [path.join(__dirname,'..','migrations/*.{ts, js}')]
});

export default AppDataSource;