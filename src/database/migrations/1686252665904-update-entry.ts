import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateEntry1686252665904 implements MigrationInterface {
    name = 'UpdateEntry1686252665904'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_entry" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "observation" varchar(300), "date" datetime NOT NULL DEFAULT ('2023-06-08T11:19:03.964Z'), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "supplierId" integer, "userId" integer, "isFinish" boolean NOT NULL DEFAULT (0), CONSTRAINT "FK_1c6ad33cab264635acb0e49bb4c" FOREIGN KEY ("supplierId") REFERENCES "supplier" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_a43c2ecae5cadbff32cc3c4e665" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_entry"("id", "observation", "date", "createdAt", "updatedAt", "supplierId", "userId") SELECT "id", "observation", "date", "createdAt", "updatedAt", "supplierId", "userId" FROM "entry"`);
        await queryRunner.query(`DROP TABLE "entry"`);
        await queryRunner.query(`ALTER TABLE "temporary_entry" RENAME TO "entry"`);
        await queryRunner.query(`CREATE TABLE "temporary_entry" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "observation" varchar(300), "date" datetime NOT NULL DEFAULT ('2023-06-08T19:31:06.086Z'), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "supplierId" integer, "userId" integer, "isFinish" boolean NOT NULL DEFAULT (0), CONSTRAINT "FK_1c6ad33cab264635acb0e49bb4c" FOREIGN KEY ("supplierId") REFERENCES "supplier" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_a43c2ecae5cadbff32cc3c4e665" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_entry"("id", "observation", "date", "createdAt", "updatedAt", "supplierId", "userId", "isFinish") SELECT "id", "observation", "date", "createdAt", "updatedAt", "supplierId", "userId", "isFinish" FROM "entry"`);
        await queryRunner.query(`DROP TABLE "entry"`);
        await queryRunner.query(`ALTER TABLE "temporary_entry" RENAME TO "entry"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entry" RENAME TO "temporary_entry"`);
        await queryRunner.query(`CREATE TABLE "entry" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "observation" varchar(300), "date" datetime NOT NULL DEFAULT ('2023-06-08T11:19:03.964Z'), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "supplierId" integer, "userId" integer, "isFinish" boolean NOT NULL DEFAULT (0), CONSTRAINT "FK_1c6ad33cab264635acb0e49bb4c" FOREIGN KEY ("supplierId") REFERENCES "supplier" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_a43c2ecae5cadbff32cc3c4e665" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "entry"("id", "observation", "date", "createdAt", "updatedAt", "supplierId", "userId", "isFinish") SELECT "id", "observation", "date", "createdAt", "updatedAt", "supplierId", "userId", "isFinish" FROM "temporary_entry"`);
        await queryRunner.query(`DROP TABLE "temporary_entry"`);
        await queryRunner.query(`ALTER TABLE "entry" RENAME TO "temporary_entry"`);
        await queryRunner.query(`CREATE TABLE "entry" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "observation" varchar(300), "date" datetime NOT NULL DEFAULT ('2023-06-08T11:19:03.964Z'), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "supplierId" integer, "userId" integer, CONSTRAINT "FK_1c6ad33cab264635acb0e49bb4c" FOREIGN KEY ("supplierId") REFERENCES "supplier" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_a43c2ecae5cadbff32cc3c4e665" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "entry"("id", "observation", "date", "createdAt", "updatedAt", "supplierId", "userId") SELECT "id", "observation", "date", "createdAt", "updatedAt", "supplierId", "userId" FROM "temporary_entry"`);
        await queryRunner.query(`DROP TABLE "temporary_entry"`);
    }

}
