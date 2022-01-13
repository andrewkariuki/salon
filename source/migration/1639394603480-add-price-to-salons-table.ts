import {MigrationInterface, QueryRunner} from "typeorm";

export class addPriceToSalonsTable1639394603480 implements MigrationInterface {
    name = 'addPriceToSalonsTable1639394603480'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "salons" ADD "price" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "salons" DROP COLUMN "price"`);
    }

}
