import {MigrationInterface, QueryRunner} from "typeorm";

export class init1639762907321 implements MigrationInterface {
    name = 'init1639762907321'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "artists" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_70c3685e197743b963339d158cc" UNIQUE ("name"), CONSTRAINT "PK_09b823d4607d2675dc4ffa82261" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lyrics" ("id" SERIAL NOT NULL, "content" character varying NOT NULL, "song_id" integer, CONSTRAINT "UQ_39199a2ed0b32fe3e32c1201913" UNIQUE ("content"), CONSTRAINT "REL_90631d860f0a197b37e2ef4175" UNIQUE ("song_id"), CONSTRAINT "PK_f7c5de22ef94f309591c5554f0f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "songs" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "album_id" integer, CONSTRAINT "UQ_deeb2be76882b6fe30d65eb7266" UNIQUE ("name"), CONSTRAINT "PK_e504ce8ad2e291d3a1d8f1ea2f4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "albums" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "release_date" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_2c85c318a6c245b0eecc2081952" UNIQUE ("title"), CONSTRAINT "PK_838ebae24d2e12082670ffc95d7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "artist_albums" ("artist_id" integer NOT NULL, "album_id" integer NOT NULL, CONSTRAINT "PK_a3cab1d1cde3cda4391dfeb39af" PRIMARY KEY ("artist_id", "album_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6abcd5fa00447e7f8d1d945449" ON "artist_albums" ("artist_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_e1d91049cde74559996b5d1fb5" ON "artist_albums" ("album_id") `);
        await queryRunner.query(`ALTER TABLE "lyrics" ADD CONSTRAINT "FK_90631d860f0a197b37e2ef4175c" FOREIGN KEY ("song_id") REFERENCES "songs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "songs" ADD CONSTRAINT "FK_944f44ec5e875219d05bb81d966" FOREIGN KEY ("album_id") REFERENCES "albums"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "artist_albums" ADD CONSTRAINT "FK_6abcd5fa00447e7f8d1d945449d" FOREIGN KEY ("artist_id") REFERENCES "artists"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "artist_albums" ADD CONSTRAINT "FK_e1d91049cde74559996b5d1fb5b" FOREIGN KEY ("album_id") REFERENCES "albums"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "artist_albums" DROP CONSTRAINT "FK_e1d91049cde74559996b5d1fb5b"`);
        await queryRunner.query(`ALTER TABLE "artist_albums" DROP CONSTRAINT "FK_6abcd5fa00447e7f8d1d945449d"`);
        await queryRunner.query(`ALTER TABLE "songs" DROP CONSTRAINT "FK_944f44ec5e875219d05bb81d966"`);
        await queryRunner.query(`ALTER TABLE "lyrics" DROP CONSTRAINT "FK_90631d860f0a197b37e2ef4175c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e1d91049cde74559996b5d1fb5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6abcd5fa00447e7f8d1d945449"`);
        await queryRunner.query(`DROP TABLE "artist_albums"`);
        await queryRunner.query(`DROP TABLE "albums"`);
        await queryRunner.query(`DROP TABLE "songs"`);
        await queryRunner.query(`DROP TABLE "lyrics"`);
        await queryRunner.query(`DROP TABLE "artists"`);
    }

}
