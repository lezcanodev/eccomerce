import { MigrationInterface, QueryRunner } from "typeorm"

export class orderStateData1675278105813 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO "order_state" VALUES 
                        ( 1, 'PENDING' ),
                        ( 2, 'SUCCESSFULL' ),
                        ( 3, 'CANCELED' );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "order_state";`);
    }

}
