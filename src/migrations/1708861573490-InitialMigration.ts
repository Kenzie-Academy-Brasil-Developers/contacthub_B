import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1708861573490 implements MigrationInterface {
    name = 'InitialMigration1708861573490'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "contactNumber"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "contactNumber" character varying(15) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP CONSTRAINT "UQ_2284b58f20c8443344971bf924e"`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "contactNumber"`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "contactNumber" character varying(15) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "contactNumber"`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "contactNumber" numeric(15,0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD CONSTRAINT "UQ_2284b58f20c8443344971bf924e" UNIQUE ("contactNumber")`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "contactNumber"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "contactNumber" character varying(16) NOT NULL`);
    }

}
