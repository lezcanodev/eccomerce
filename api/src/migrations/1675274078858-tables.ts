import { MigrationInterface, QueryRunner } from "typeorm"

export class tables1675274078858 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        //Role table
        await queryRunner.query(`
        CREATE TABLE "role"(
            id SERIAL NOT NULL,
            name CHARACTER VARYING(50) NOT NULL,

            CONSTRAINT pk_role_id PRIMARY KEY(id)
        );
        `);

        //User table
        await queryRunner.query(`
        CREATE TABLE "user"(
            id SERIAL NOT NULL,
            rol_id INTEGER NOT NULL,
            nick CHARACTER VARYING(50) NOT NULL,
            email CHARACTER VARYING(100) NOT NULL,
            password_hash CHARACTER VARYING(70) NOT NULL,
            create_at TIMESTAMP NOT NULL DEFAULT NOW(),
            modified_at TIMESTAMP NOT NULL DEFAULT NOW(),

            CONSTRAINT pk_user_id PRIMARY KEY(id),
            CONSTRAINT fk_user_rol_id FOREIGN KEY(rol_id) REFERENCES "role"(id),
            CONSTRAINT uq_user_nick UNIQUE(nick),
            CONSTRAINT uq_user_email UNIQUE(email)
        );
        `);

        //Category table
        await queryRunner.query(`
        CREATE TABLE "category"(
            id SERIAL NOT NULL,
            name CHARACTER VARYING(50) NOT NULL,
            parent_id INTEGER DEFAULT NULL,

            CONSTRAINT pk_category_id PRIMARY KEY(id)
        );
        `);


        //Product table
        await queryRunner.query(`
        CREATE TABLE "product"(
            id CHARACTER VARYING(70) NOT NULL,
            user_id INTEGER NOT NULL,
            category_id INTEGER,
            title CHARACTER VARYING(150) NOT NULL,
            description TEXT,
            price NUMERIC(15,5),
            create_at TIMESTAMP NOT NULL DEFAULT NOW(),
            modified_at TIMESTAMP NOT NULL DEFAULT NOW(),

            CONSTRAINT pk_product_id PRIMARY KEY(id),
            CONSTRAINT fk_product_user_id FOREIGN KEY(user_id) REFERENCES "user"(id) ON DELETE CASCADE ON UPDATE CASCADE,
            CONSTRAINT fk_product_category_id FOREIGN KEY(category_id) REFERENCES "category"(id) ON DELETE SET NULL ON UPDATE CASCADE
        );
        `);


        //Product images table
        await queryRunner.query(`
        CREATE TABLE "product_image"(
            product_id CHARACTER VARYING(70) NOT NULL,
            image CHARACTER VARYING(150) NOT NULL,
            
            CONSTRAINT pk_product_image PRIMARY KEY(product_id, image),
            CONSTRAINT fk_product_image_product_id FOREIGN KEY(product_id) REFERENCES "product"(id) ON DELETE CASCADE ON UPDATE CASCADE
        );
        `);
         
        
        //Oder state table
        await queryRunner.query(`
        CREATE TABLE "order_state"(
            id SERIAL NOT NULL,
            name CHARACTER VARYING(30) NOT NULL,

            CONSTRAINT pk_order_state_id PRIMARY KEY(id)
        );
        `);

        //Oder table
        await queryRunner.query(`
        CREATE TABLE "order"(
            id SERIAL NOT NULL,
            user_id INTEGER,
            product_id CHARACTER VARYING(70),
            order_state_id INTEGER,
            first_name CHARACTER VARYING(50) NOT NULL,
            second_name CHARACTER VARYING(50) NOT NULL,
            total_price NUMERIC(15,5),
            create_at TIMESTAMP NOT NULL DEFAULT NOW(),
            modified_at TIMESTAMP NOT NULL DEFAULT NOW(),

            CONSTRAINT pk_order_id PRIMARY KEY(id),
            CONSTRAINT fk_order_user_id FOREIGN KEY(user_id) REFERENCES "user"(id) ON DELETE SET NULL ON UPDATE CASCADE,
            CONSTRAINT fk_order_product_id FOREIGN KEY(product_id) REFERENCES "product"(id) ON DELETE SET NULL ON UPDATE CASCADE,
            CONSTRAINT fk_order_order_state FOREIGN KEY(order_state_id) REFERENCES "order_state"(id) ON DELETE SET NULL ON UPDATE CASCADE
        );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        
            await queryRunner.query(`DROP TABLE "order";`);
            await queryRunner.query(`DROP TABLE "order_state";`);
            await queryRunner.query(`DROP TABLE "product_image";`);
            await queryRunner.query(`DROP TABLE "product";`);
            await queryRunner.query(`DROP TABLE "category";`);
            await queryRunner.query(`DROP TABLE "user";`);
            await queryRunner.query(`DROP TABLE "role";`);

    }

}
