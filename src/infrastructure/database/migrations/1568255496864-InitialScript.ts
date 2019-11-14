import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialScript1568255496864 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto";');
        await queryRunner.query('CREATE TABLE "blogs" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "title" character varying(100) NOT NULL, "description" character varying(350), "content" text NOT NULL, "owner_id" uuid, "is_public" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_e113335f11c926da929a625f118" PRIMARY KEY ("id"))');
        await queryRunner.query('CREATE TABLE "users" ("id" uuid NOT NULL, "names" character varying(100) NOT NULL, "surnames" character varying(100) NOT NULL, "nickname" character varying(50) NOT NULL, "email" character varying(100) NOT NULL, CONSTRAINT "UQ_ad02a1be8707004cb805a4b5023" UNIQUE ("nickname"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))');
        await queryRunner.query('ALTER TABLE "blogs" ADD CONSTRAINT "FK_c699ca1c62cd9707420e4acab90" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE "blogs" DROP CONSTRAINT "FK_c699ca1c62cd9707420e4acab90"', undefined);
        await queryRunner.query('DROP TABLE "blogs"', undefined);
        await queryRunner.query('DROP TABLE "users"', undefined);
    }

}
