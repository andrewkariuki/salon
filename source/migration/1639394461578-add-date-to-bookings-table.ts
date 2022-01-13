import {MigrationInterface, QueryRunner} from "typeorm";

export class addDateToBookingsTable1639394461578 implements MigrationInterface {
    name = 'addDateToBookingsTable1639394461578'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookings" ADD "date" date NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "date"`);
    }

}
