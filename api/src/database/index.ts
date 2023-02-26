import { DataSource } from "typeorm";
import path from 'path';
/*
const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "eccomerce",
    synchronize: false,
    entities: [path.join(__dirname,'..','entities/*.entity.ts')],
    migrations: [path.join(__dirname,'..','migrations/*.ts')]
});*/

const AppDataSource = new DataSource({
    type: "postgres",
    host: "dpg-cftmlspa6gdotcfk2acg-a.frankfurt-postgres.render.com",
    port: 5432,
    username: "root_eccomerce_dump",
    password: "Aofv5ztVEfz7UgiyyD8ZVvxgOGZmCbjQ",
    database: "eccomerce_dump",
    synchronize: false,
    entities: [path.join(__dirname,'..','entities/*.entity.ts')],
    migrations: [path.join(__dirname,'..','migrations/*.ts')]
});

export default AppDataSource;