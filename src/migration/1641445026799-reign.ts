import {MigrationInterface, QueryRunner} from "typeorm";

export class reign1641445026799 implements MigrationInterface {
    name = 'reign1641445026799'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tags" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_d90243459a697eadb8ad56e9092" UNIQUE ("name"), CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "article" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "salt" character varying NOT NULL, CONSTRAINT "PK_40808690eb7b915046558c0f81b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "salt" character varying NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "article_tag" ("article_id" integer NOT NULL, "tag_id" integer NOT NULL, CONSTRAINT "PK_82061ea91c181fc708715430361" PRIMARY KEY ("article_id", "tag_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_26455b396109a0b535ddb61483" ON "article_tag" ("article_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_cdc3f155737b763c298ab080f8" ON "article_tag" ("tag_id") `);
        await queryRunner.query(`ALTER TABLE "article_tag" ADD CONSTRAINT "FK_26455b396109a0b535ddb614832" FOREIGN KEY ("article_id") REFERENCES "article"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "article_tag" ADD CONSTRAINT "FK_cdc3f155737b763c298ab080f84" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article_tag" DROP CONSTRAINT "FK_cdc3f155737b763c298ab080f84"`);
        await queryRunner.query(`ALTER TABLE "article_tag" DROP CONSTRAINT "FK_26455b396109a0b535ddb614832"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cdc3f155737b763c298ab080f8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_26455b396109a0b535ddb61483"`);
        await queryRunner.query(`DROP TABLE "article_tag"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "article"`);
        await queryRunner.query(`DROP TABLE "tags"`);
    }

}
