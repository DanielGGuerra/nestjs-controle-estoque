import { MigrationInterface, QueryRunner } from 'typeorm';

export class Start1685567790833 implements MigrationInterface {
  name = 'Start1685567790833';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "uf" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(50) NOT NULL, "acronym" varchar(2) NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, CONSTRAINT "UQ_896aef88ebd3a60e40275086111" UNIQUE ("acronym"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_896aef88ebd3a60e4027508611" ON "uf" ("acronym") `,
    );
    await queryRunner.query(
      `CREATE TABLE "city" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(50) NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "ufId" integer)`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(100) NOT NULL, "email" varchar(100) NOT NULL, "phoneNumber" varchar(20) NOT NULL, "password" varchar(200) NOT NULL, "cep" varchar(9) NOT NULL, "address" varchar(100) NOT NULL, "addressNumber" integer, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "cityId" integer, "ufId" integer)`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_city" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(50) NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "ufId" integer, CONSTRAINT "FK_a463e1db05d20428ee97f8a065a" FOREIGN KEY ("ufId") REFERENCES "uf" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_city"("id", "name", "createdAt", "updatedAt", "deletedAt", "ufId") SELECT "id", "name", "createdAt", "updatedAt", "deletedAt", "ufId" FROM "city"`,
    );
    await queryRunner.query(`DROP TABLE "city"`);
    await queryRunner.query(`ALTER TABLE "temporary_city" RENAME TO "city"`);
    await queryRunner.query(`DROP INDEX "IDX_e12875dfb3b1d92d7d7c5377e2"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(100) NOT NULL, "email" varchar(100) NOT NULL, "phoneNumber" varchar(20) NOT NULL, "password" varchar(200) NOT NULL, "cep" varchar(9) NOT NULL, "address" varchar(100) NOT NULL, "addressNumber" integer, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "cityId" integer, "ufId" integer, CONSTRAINT "FK_beb5846554bec348f6baf449e83" FOREIGN KEY ("cityId") REFERENCES "city" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_7a0c90d31d9d590ee4ef4c619f3" FOREIGN KEY ("ufId") REFERENCES "uf" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_user"("id", "name", "email", "phoneNumber", "password", "cep", "address", "addressNumber", "createdAt", "updatedAt", "deletedAt", "cityId", "ufId") SELECT "id", "name", "email", "phoneNumber", "password", "cep", "address", "addressNumber", "createdAt", "updatedAt", "deletedAt", "cityId", "ufId" FROM "user"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
    await queryRunner.query(
      `CREATE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_e12875dfb3b1d92d7d7c5377e2"`);
    await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
    await queryRunner.query(
      `CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(100) NOT NULL, "email" varchar(100) NOT NULL, "phoneNumber" varchar(20) NOT NULL, "password" varchar(200) NOT NULL, "cep" varchar(9) NOT NULL, "address" varchar(100) NOT NULL, "addressNumber" integer, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "cityId" integer, "ufId" integer)`,
    );
    await queryRunner.query(
      `INSERT INTO "user"("id", "name", "email", "phoneNumber", "password", "cep", "address", "addressNumber", "createdAt", "updatedAt", "deletedAt", "cityId", "ufId") SELECT "id", "name", "email", "phoneNumber", "password", "cep", "address", "addressNumber", "createdAt", "updatedAt", "deletedAt", "cityId", "ufId" FROM "temporary_user"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_user"`);
    await queryRunner.query(
      `CREATE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `,
    );
    await queryRunner.query(`ALTER TABLE "city" RENAME TO "temporary_city"`);
    await queryRunner.query(
      `CREATE TABLE "city" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(50) NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "ufId" integer)`,
    );
    await queryRunner.query(
      `INSERT INTO "city"("id", "name", "createdAt", "updatedAt", "deletedAt", "ufId") SELECT "id", "name", "createdAt", "updatedAt", "deletedAt", "ufId" FROM "temporary_city"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_city"`);
    await queryRunner.query(`DROP INDEX "IDX_e12875dfb3b1d92d7d7c5377e2"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "city"`);
    await queryRunner.query(`DROP INDEX "IDX_896aef88ebd3a60e4027508611"`);
    await queryRunner.query(`DROP TABLE "uf"`);
  }
}
