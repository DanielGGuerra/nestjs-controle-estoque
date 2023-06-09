import { MigrationInterface, QueryRunner } from "typeorm";

export class Item1685659257756 implements MigrationInterface {
    name = 'Item1685659257756'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "type_item" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "description" varchar(100) NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "item" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "description" varchar(100) NOT NULL, "balance" decimal NOT NULL DEFAULT (0), "unitaryValue" varchar(2) NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updateAt" datetime NOT NULL DEFAULT (datetime('now')), "typeItemId" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_item" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "description" varchar(100) NOT NULL, "balance" decimal NOT NULL DEFAULT (0), "unitaryValue" varchar(2) NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updateAt" datetime NOT NULL DEFAULT (datetime('now')), "typeItemId" integer NOT NULL, CONSTRAINT "FK_1a85e50bec81eddfb063aa2ca7e" FOREIGN KEY ("typeItemId") REFERENCES "type_item" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_item"("id", "description", "balance", "unitaryValue", "createdAt", "updateAt", "typeItemId") SELECT "id", "description", "balance", "unitaryValue", "createdAt", "updateAt", "typeItemId" FROM "item"`);
        await queryRunner.query(`DROP TABLE "item"`);
        await queryRunner.query(`ALTER TABLE "temporary_item" RENAME TO "item"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" RENAME TO "temporary_item"`);
        await queryRunner.query(`CREATE TABLE "item" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "description" varchar(100) NOT NULL, "balance" decimal NOT NULL DEFAULT (0), "unitaryValue" varchar(2) NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updateAt" datetime NOT NULL DEFAULT (datetime('now')), "typeItemId" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "item"("id", "description", "balance", "unitaryValue", "createdAt", "updateAt", "typeItemId") SELECT "id", "description", "balance", "unitaryValue", "createdAt", "updateAt", "typeItemId" FROM "temporary_item"`);
        await queryRunner.query(`DROP TABLE "temporary_item"`);
        await queryRunner.query(`DROP TABLE "item"`);
        await queryRunner.query(`DROP TABLE "type_item"`);
    }

}
