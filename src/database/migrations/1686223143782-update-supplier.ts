import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSupplier1686223143782 implements MigrationInterface {
    name = 'UpdateSupplier1686223143782'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_supplier" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(200) NOT NULL, "cnpj" varchar(14) NOT NULL, "ie" varchar(14), "cep" varchar(8) NOT NULL, "address" varchar(100) NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "ufId" integer, "cityId" integer, "addressNumber" integer NOT NULL, CONSTRAINT "FK_82cb75e968b854b8cc5ecff014e" FOREIGN KEY ("cityId") REFERENCES "city" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_80d44e3872c96c157167cb5eb89" FOREIGN KEY ("ufId") REFERENCES "uf" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_supplier"("id", "name", "cnpj", "ie", "cep", "address", "createdAt", "updatedAt", "ufId", "cityId") SELECT "id", "name", "cnpj", "ie", "cep", "address", "createdAt", "updatedAt", "ufId", "cityId" FROM "supplier"`);
        await queryRunner.query(`DROP TABLE "supplier"`);
        await queryRunner.query(`ALTER TABLE "temporary_supplier" RENAME TO "supplier"`);
        await queryRunner.query(`CREATE TABLE "temporary_entry" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "observation" varchar(300), "date" datetime NOT NULL DEFAULT ('2023-06-08T11:19:03.964Z'), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "supplierId" integer, "userId" integer, CONSTRAINT "FK_a43c2ecae5cadbff32cc3c4e665" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_1c6ad33cab264635acb0e49bb4c" FOREIGN KEY ("supplierId") REFERENCES "supplier" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_entry"("id", "observation", "date", "createdAt", "updatedAt", "supplierId", "userId") SELECT "id", "observation", "date", "createdAt", "updatedAt", "supplierId", "userId" FROM "entry"`);
        await queryRunner.query(`DROP TABLE "entry"`);
        await queryRunner.query(`ALTER TABLE "temporary_entry" RENAME TO "entry"`);
        await queryRunner.query(`CREATE TABLE "temporary_supplier" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(200) NOT NULL, "cnpj" varchar(14) NOT NULL, "ie" varchar(14), "cep" varchar(8) NOT NULL, "address" varchar(100) NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "ufId" integer, "cityId" integer, "addressNumber" integer NOT NULL, CONSTRAINT "UQ_470d915935c7e1a7d1e70678358" UNIQUE ("cnpj"), CONSTRAINT "FK_82cb75e968b854b8cc5ecff014e" FOREIGN KEY ("cityId") REFERENCES "city" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_80d44e3872c96c157167cb5eb89" FOREIGN KEY ("ufId") REFERENCES "uf" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_supplier"("id", "name", "cnpj", "ie", "cep", "address", "createdAt", "updatedAt", "ufId", "cityId", "addressNumber") SELECT "id", "name", "cnpj", "ie", "cep", "address", "createdAt", "updatedAt", "ufId", "cityId", "addressNumber" FROM "supplier"`);
        await queryRunner.query(`DROP TABLE "supplier"`);
        await queryRunner.query(`ALTER TABLE "temporary_supplier" RENAME TO "supplier"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "supplier" RENAME TO "temporary_supplier"`);
        await queryRunner.query(`CREATE TABLE "supplier" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(200) NOT NULL, "cnpj" varchar(14) NOT NULL, "ie" varchar(14), "cep" varchar(8) NOT NULL, "address" varchar(100) NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "ufId" integer, "cityId" integer, "addressNumber" integer NOT NULL, CONSTRAINT "FK_82cb75e968b854b8cc5ecff014e" FOREIGN KEY ("cityId") REFERENCES "city" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_80d44e3872c96c157167cb5eb89" FOREIGN KEY ("ufId") REFERENCES "uf" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "supplier"("id", "name", "cnpj", "ie", "cep", "address", "createdAt", "updatedAt", "ufId", "cityId", "addressNumber") SELECT "id", "name", "cnpj", "ie", "cep", "address", "createdAt", "updatedAt", "ufId", "cityId", "addressNumber" FROM "temporary_supplier"`);
        await queryRunner.query(`DROP TABLE "temporary_supplier"`);
        await queryRunner.query(`ALTER TABLE "entry" RENAME TO "temporary_entry"`);
        await queryRunner.query(`CREATE TABLE "entry" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "observation" varchar(300), "date" datetime NOT NULL DEFAULT ('2023-06-03T22:10:53.661Z'), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "supplierId" integer, "userId" integer, CONSTRAINT "FK_a43c2ecae5cadbff32cc3c4e665" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_1c6ad33cab264635acb0e49bb4c" FOREIGN KEY ("supplierId") REFERENCES "supplier" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "entry"("id", "observation", "date", "createdAt", "updatedAt", "supplierId", "userId") SELECT "id", "observation", "date", "createdAt", "updatedAt", "supplierId", "userId" FROM "temporary_entry"`);
        await queryRunner.query(`DROP TABLE "temporary_entry"`);
        await queryRunner.query(`ALTER TABLE "supplier" RENAME TO "temporary_supplier"`);
        await queryRunner.query(`CREATE TABLE "supplier" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(200) NOT NULL, "cnpj" varchar(14) NOT NULL, "ie" varchar(14), "cep" varchar(8) NOT NULL, "address" varchar(100) NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "ufId" integer, "cityId" integer, CONSTRAINT "FK_82cb75e968b854b8cc5ecff014e" FOREIGN KEY ("cityId") REFERENCES "city" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_80d44e3872c96c157167cb5eb89" FOREIGN KEY ("ufId") REFERENCES "uf" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "supplier"("id", "name", "cnpj", "ie", "cep", "address", "createdAt", "updatedAt", "ufId", "cityId") SELECT "id", "name", "cnpj", "ie", "cep", "address", "createdAt", "updatedAt", "ufId", "cityId" FROM "temporary_supplier"`);
        await queryRunner.query(`DROP TABLE "temporary_supplier"`);
    }

}
