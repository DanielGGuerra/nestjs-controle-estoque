import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1685620488587 implements MigrationInterface {
  name = 'User1685620488587';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_e12875dfb3b1d92d7d7c5377e2"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(100) NOT NULL, "email" varchar(100) NOT NULL, "phoneNumber" varchar(20) NOT NULL, "password" varchar(200) NOT NULL, "cep" varchar(9) NOT NULL, "address" varchar(100) NOT NULL, "addressNumber" integer, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "cityId" integer, "ufId" integer, CONSTRAINT "FK_7a0c90d31d9d590ee4ef4c619f3" FOREIGN KEY ("ufId") REFERENCES "uf" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_beb5846554bec348f6baf449e83" FOREIGN KEY ("cityId") REFERENCES "city" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_user"("id", "name", "email", "phoneNumber", "password", "cep", "address", "addressNumber", "createdAt", "updatedAt", "deletedAt", "cityId", "ufId") SELECT "id", "name", "email", "phoneNumber", "password", "cep", "address", "addressNumber", "createdAt", "updatedAt", "deletedAt", "cityId", "ufId" FROM "user"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
    await queryRunner.query(
      `CREATE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `,
    );
    await queryRunner.query(`DROP INDEX "IDX_e12875dfb3b1d92d7d7c5377e2"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(100) NOT NULL, "email" varchar(100) NOT NULL, "phoneNumber" varchar(20) NOT NULL, "password" varchar(200) NOT NULL, "cep" varchar(9) NOT NULL, "address" varchar(100) NOT NULL, "addressNumber" integer, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "cityId" integer, "ufId" integer, CONSTRAINT "UQ_ed766a9782779b8390a2a81f444" UNIQUE ("email"), CONSTRAINT "FK_7a0c90d31d9d590ee4ef4c619f3" FOREIGN KEY ("ufId") REFERENCES "uf" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_beb5846554bec348f6baf449e83" FOREIGN KEY ("cityId") REFERENCES "city" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
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
      `CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(100) NOT NULL, "email" varchar(100) NOT NULL, "phoneNumber" varchar(20) NOT NULL, "password" varchar(200) NOT NULL, "cep" varchar(9) NOT NULL, "address" varchar(100) NOT NULL, "addressNumber" integer, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "cityId" integer, "ufId" integer, CONSTRAINT "FK_7a0c90d31d9d590ee4ef4c619f3" FOREIGN KEY ("ufId") REFERENCES "uf" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_beb5846554bec348f6baf449e83" FOREIGN KEY ("cityId") REFERENCES "city" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "user"("id", "name", "email", "phoneNumber", "password", "cep", "address", "addressNumber", "createdAt", "updatedAt", "deletedAt", "cityId", "ufId") SELECT "id", "name", "email", "phoneNumber", "password", "cep", "address", "addressNumber", "createdAt", "updatedAt", "deletedAt", "cityId", "ufId" FROM "temporary_user"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_user"`);
    await queryRunner.query(
      `CREATE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `,
    );
    await queryRunner.query(`DROP INDEX "IDX_e12875dfb3b1d92d7d7c5377e2"`);
    await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
    await queryRunner.query(
      `CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(100) NOT NULL, "email" varchar(100) NOT NULL, "phoneNumber" varchar(20) NOT NULL, "password" varchar(200) NOT NULL, "cep" varchar(9) NOT NULL, "address" varchar(100) NOT NULL, "addressNumber" integer, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "cityId" integer, "ufId" integer, CONSTRAINT "FK_7a0c90d31d9d590ee4ef4c619f3" FOREIGN KEY ("ufId") REFERENCES "uf" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_beb5846554bec348f6baf449e83" FOREIGN KEY ("cityId") REFERENCES "city" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "user"("id", "name", "email", "phoneNumber", "password", "cep", "address", "addressNumber", "createdAt", "updatedAt", "deletedAt", "cityId", "ufId") SELECT "id", "name", "email", "phoneNumber", "password", "cep", "address", "addressNumber", "createdAt", "updatedAt", "deletedAt", "cityId", "ufId" FROM "temporary_user"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_user"`);
    await queryRunner.query(
      `CREATE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `,
    );
  }
}
