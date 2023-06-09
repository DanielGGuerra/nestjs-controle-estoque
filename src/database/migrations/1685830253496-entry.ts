import { MigrationInterface, QueryRunner } from "typeorm";

export class Entry1685830253496 implements MigrationInterface {
    name = 'Entry1685830253496'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "entry_item" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "quanty" decimal NOT NULL, "itemId" integer, "entryId" integer)`);
        await queryRunner.query(`CREATE TABLE "entry" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "observation" varchar(300), "date" datetime NOT NULL DEFAULT ('2023-06-03T22:10:53.661Z'), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "supplierId" integer, "userId" integer)`);
        await queryRunner.query(`CREATE TABLE "supplier" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(200) NOT NULL, "cnpj" varchar(14) NOT NULL, "ie" varchar(14), "cep" varchar(8) NOT NULL, "address" varchar(100) NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "ufId" integer, "cityId" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_entry_item" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "quanty" decimal NOT NULL, "itemId" integer, "entryId" integer, CONSTRAINT "FK_8ee6a0fbb30838850d113073dfc" FOREIGN KEY ("itemId") REFERENCES "item" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_25ffc0072e132d78f99f93ca01b" FOREIGN KEY ("entryId") REFERENCES "entry" ("id") ON DELETE CASCADE ON UPDATE CASCADE)`);
        await queryRunner.query(`INSERT INTO "temporary_entry_item"("id", "quanty", "itemId", "entryId") SELECT "id", "quanty", "itemId", "entryId" FROM "entry_item"`);
        await queryRunner.query(`DROP TABLE "entry_item"`);
        await queryRunner.query(`ALTER TABLE "temporary_entry_item" RENAME TO "entry_item"`);
        await queryRunner.query(`CREATE TABLE "temporary_entry" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "observation" varchar(300), "date" datetime NOT NULL DEFAULT ('2023-06-03T22:10:53.661Z'), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "supplierId" integer, "userId" integer, CONSTRAINT "FK_1c6ad33cab264635acb0e49bb4c" FOREIGN KEY ("supplierId") REFERENCES "supplier" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_a43c2ecae5cadbff32cc3c4e665" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_entry"("id", "observation", "date", "createdAt", "updatedAt", "supplierId", "userId") SELECT "id", "observation", "date", "createdAt", "updatedAt", "supplierId", "userId" FROM "entry"`);
        await queryRunner.query(`DROP TABLE "entry"`);
        await queryRunner.query(`ALTER TABLE "temporary_entry" RENAME TO "entry"`);
        await queryRunner.query(`CREATE TABLE "temporary_supplier" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(200) NOT NULL, "cnpj" varchar(14) NOT NULL, "ie" varchar(14), "cep" varchar(8) NOT NULL, "address" varchar(100) NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "ufId" integer, "cityId" integer, CONSTRAINT "FK_80d44e3872c96c157167cb5eb89" FOREIGN KEY ("ufId") REFERENCES "uf" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_82cb75e968b854b8cc5ecff014e" FOREIGN KEY ("cityId") REFERENCES "city" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_supplier"("id", "name", "cnpj", "ie", "cep", "address", "createdAt", "updatedAt", "ufId", "cityId") SELECT "id", "name", "cnpj", "ie", "cep", "address", "createdAt", "updatedAt", "ufId", "cityId" FROM "supplier"`);
        await queryRunner.query(`DROP TABLE "supplier"`);
        await queryRunner.query(`ALTER TABLE "temporary_supplier" RENAME TO "supplier"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "supplier" RENAME TO "temporary_supplier"`);
        await queryRunner.query(`CREATE TABLE "supplier" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(200) NOT NULL, "cnpj" varchar(14) NOT NULL, "ie" varchar(14), "cep" varchar(8) NOT NULL, "address" varchar(100) NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "ufId" integer, "cityId" integer)`);
        await queryRunner.query(`INSERT INTO "supplier"("id", "name", "cnpj", "ie", "cep", "address", "createdAt", "updatedAt", "ufId", "cityId") SELECT "id", "name", "cnpj", "ie", "cep", "address", "createdAt", "updatedAt", "ufId", "cityId" FROM "temporary_supplier"`);
        await queryRunner.query(`DROP TABLE "temporary_supplier"`);
        await queryRunner.query(`ALTER TABLE "entry" RENAME TO "temporary_entry"`);
        await queryRunner.query(`CREATE TABLE "entry" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "observation" varchar(300), "date" datetime NOT NULL DEFAULT ('2023-06-03T22:10:53.661Z'), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "supplierId" integer, "userId" integer)`);
        await queryRunner.query(`INSERT INTO "entry"("id", "observation", "date", "createdAt", "updatedAt", "supplierId", "userId") SELECT "id", "observation", "date", "createdAt", "updatedAt", "supplierId", "userId" FROM "temporary_entry"`);
        await queryRunner.query(`DROP TABLE "temporary_entry"`);
        await queryRunner.query(`ALTER TABLE "entry_item" RENAME TO "temporary_entry_item"`);
        await queryRunner.query(`CREATE TABLE "entry_item" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "quanty" decimal NOT NULL, "itemId" integer, "entryId" integer)`);
        await queryRunner.query(`INSERT INTO "entry_item"("id", "quanty", "itemId", "entryId") SELECT "id", "quanty", "itemId", "entryId" FROM "temporary_entry_item"`);
        await queryRunner.query(`DROP TABLE "temporary_entry_item"`);
        await queryRunner.query(`DROP TABLE "supplier"`);
        await queryRunner.query(`DROP TABLE "entry"`);
        await queryRunner.query(`DROP TABLE "entry_item"`);
    }

}
