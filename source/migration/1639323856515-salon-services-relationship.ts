import {MigrationInterface, QueryRunner} from "typeorm";

export class salonServicesRelationship1639323856515 implements MigrationInterface {
    name = 'salonServicesRelationship1639323856515'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "services" ADD "salonId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "services" ADD CONSTRAINT "FK_07a79176febab5096d5181f08b9" FOREIGN KEY ("salonId") REFERENCES "salons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "services" DROP CONSTRAINT "FK_07a79176febab5096d5181f08b9"`);
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "salonId"`);
    }

}
