import {MigrationInterface, QueryRunner} from "typeorm";

export class salonTable1639323146231 implements MigrationInterface {
    name = 'salonTable1639323146231'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "salons" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "category" character varying(100) NOT NULL, "pictureUrl" text, "description" character varying(255) NOT NULL, "city" character varying(255) NOT NULL, "slots" integer NOT NULL, "availability" integer NOT NULL, CONSTRAINT "PK_4cbe0adde860abd3b68b196a0b2" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "salons"`);
    }

}
