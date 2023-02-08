import { MigrationInterface, QueryRunner } from "typeorm"

export class rolesData1675278085524 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO "role" VALUES 
                        ( 1, 'ADMIN' ),
                        ( 2, 'USER' );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        //await queryRunner.query(`DELETE FROM "role";`);
    }

}
