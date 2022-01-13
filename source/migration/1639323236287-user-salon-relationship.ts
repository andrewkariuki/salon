import {MigrationInterface, QueryRunner} from "typeorm";

export class userSalonRelationship1639323236287 implements MigrationInterface {
    name = 'userSalonRelationship1639323236287'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "salons" ADD "userId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "salons" ADD CONSTRAINT "FK_a5ad960b79af43aef0992364244" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "salons" DROP CONSTRAINT "FK_a5ad960b79af43aef0992364244"`);
        await queryRunner.query(`ALTER TABLE "salons" DROP COLUMN "userId"`);
    }

}
