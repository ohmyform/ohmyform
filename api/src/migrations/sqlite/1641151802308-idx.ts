import { MigrationInterface, QueryRunner } from 'typeorm'

export class idx1641151802308 implements MigrationInterface {
  name = 'idx1641151802308'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "temporary_form_field_logic" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "formula" varchar NOT NULL, "action" varchar(10) NOT NULL, "visible" boolean, "require" boolean, "disable" boolean, "enabled" boolean NOT NULL, "fieldId" integer, "jumpToId" integer, "idx" integer, CONSTRAINT "FK_4a8019f2b753cfb3216dc3001a6" FOREIGN KEY ("jumpToId") REFERENCES "form_field" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_6098b83f6759445d8cfdd03d545" FOREIGN KEY ("fieldId") REFERENCES "form_field" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)');
    await queryRunner.query('INSERT INTO "temporary_form_field_logic"("id", "formula", "action", "visible", "require", "disable", "enabled", "fieldId", "jumpToId") SELECT "id", "formula", "action", "visible", "require", "disable", "enabled", "fieldId", "jumpToId" FROM "form_field_logic"');
    await queryRunner.query('DROP TABLE "form_field_logic"');
    await queryRunner.query('ALTER TABLE "temporary_form_field_logic" RENAME TO "form_field_logic"');
    await queryRunner.query('CREATE TABLE "temporary_form_field" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" text NOT NULL, "slug" varchar, "required" boolean NOT NULL, "disabled" boolean NOT NULL, "type" varchar NOT NULL, "value" varchar NOT NULL, "formId" integer, "ratingSteps" integer, "ratingShape" varchar, "idx" integer, CONSTRAINT "FK_2d83d8a334dd66445db13f92b77" FOREIGN KEY ("formId") REFERENCES "form" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)');
    await queryRunner.query('INSERT INTO "temporary_form_field"("id", "title", "description", "slug", "required", "disabled", "type", "value", "formId", "ratingSteps", "ratingShape") SELECT "id", "title", "description", "slug", "required", "disabled", "type", "value", "formId", "ratingSteps", "ratingShape" FROM "form_field"');
    await queryRunner.query('DROP TABLE "form_field"');
    await queryRunner.query('ALTER TABLE "temporary_form_field" RENAME TO "form_field"');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "form_field" RENAME TO "temporary_form_field"');
    await queryRunner.query('CREATE TABLE "form_field" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" text NOT NULL, "slug" varchar, "required" boolean NOT NULL, "disabled" boolean NOT NULL, "type" varchar NOT NULL, "value" varchar NOT NULL, "formId" integer, "ratingSteps" integer, "ratingShape" varchar, CONSTRAINT "FK_2d83d8a334dd66445db13f92b77" FOREIGN KEY ("formId") REFERENCES "form" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)');
    await queryRunner.query('INSERT INTO "form_field"("id", "title", "description", "slug", "required", "disabled", "type", "value", "formId", "ratingSteps", "ratingShape") SELECT "id", "title", "description", "slug", "required", "disabled", "type", "value", "formId", "ratingSteps", "ratingShape" FROM "temporary_form_field"');
    await queryRunner.query('DROP TABLE "temporary_form_field"');
    await queryRunner.query('ALTER TABLE "form_field_logic" RENAME TO "temporary_form_field_logic"');
    await queryRunner.query('CREATE TABLE "form_field_logic" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "formula" varchar NOT NULL, "action" varchar(10) NOT NULL, "visible" boolean, "require" boolean, "disable" boolean, "enabled" boolean NOT NULL, "fieldId" integer, "jumpToId" integer, CONSTRAINT "FK_4a8019f2b753cfb3216dc3001a6" FOREIGN KEY ("jumpToId") REFERENCES "form_field" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_6098b83f6759445d8cfdd03d545" FOREIGN KEY ("fieldId") REFERENCES "form_field" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)');
    await queryRunner.query('INSERT INTO "form_field_logic"("id", "formula", "action", "visible", "require", "disable", "enabled", "fieldId", "jumpToId") SELECT "id", "formula", "action", "visible", "require", "disable", "enabled", "fieldId", "jumpToId" FROM "temporary_form_field_logic"');
    await queryRunner.query('DROP TABLE "temporary_form_field_logic"');
  }
}
