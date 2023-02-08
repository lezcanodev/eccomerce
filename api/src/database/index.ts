import { DataSource } from "typeorm";
import path from 'path';

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
});

export default AppDataSource;