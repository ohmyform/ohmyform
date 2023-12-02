import { QueryRunner } from 'typeorm'
import { SqliteMigration } from '../sqlite.migration'

export class defaultValue1645956388810 extends SqliteMigration {
  name = 'defaultValue1645956388810'

  public async realUp(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "temporary_form_field" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" text NOT NULL, "slug" varchar, "required" boolean NOT NULL, "disabled" boolean NOT NULL, "type" varchar NOT NULL, "defaultValue" varchar NOT NULL, "formId" integer, "ratingSteps" integer, "ratingShape" varchar, "idx" integer, CONSTRAINT "FK_2d83d8a334dd66445db13f92b77" FOREIGN KEY ("formId") REFERENCES "form" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)');
    await queryRunner.query('INSERT INTO "temporary_form_field"("id", "title", "description", "slug", "required", "disabled", "type", "defaultValue", "formId", "ratingSteps", "ratingShape", "idx") SELECT "id", "title", "description", "slug", "required", "disabled", "type", "defaultValue", "formId", "ratingSteps", "ratingShape", "idx" FROM "form_field"');
    await queryRunner.query('DROP TABLE "form_field"');
    await queryRunner.query('ALTER TABLE "temporary_form_field" RENAME TO "form_field"');
    await queryRunner.query('CREATE TABLE "temporary_form_field" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" text NOT NULL, "slug" varchar, "required" boolean NOT NULL, "disabled" boolean NOT NULL, "type" varchar NOT NULL, "defaultValue" varchar, "formId" integer, "ratingSteps" integer, "ratingShape" varchar, "idx" integer, CONSTRAINT "FK_2d83d8a334dd66445db13f92b77" FOREIGN KEY ("formId") REFERENCES "form" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)');
    await queryRunner.query('INSERT INTO "temporary_form_field"("id", "title", "description", "slug", "required", "disabled", "type", "defaultValue", "formId", "ratingSteps", "ratingShape", "idx") SELECT "id", "title", "description", "slug", "required", "disabled", "type", "defaultValue", "formId", "ratingSteps", "ratingShape", "idx" FROM "form_field"');
    await queryRunner.query('DROP TABLE "form_field"');
    await queryRunner.query('ALTER TABLE "temporary_form_field" RENAME TO "form_field"');
  }

  public async realDown(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('UPDATE "form_field" SET "defaultValue" = \'\' WHERE "defaultValue" IS NULL');

    await queryRunner.query('ALTER TABLE "form_field" RENAME TO "temporary_form_field"');
    await queryRunner.query('CREATE TABLE "form_field" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" text NOT NULL, "slug" varchar, "required" boolean NOT NULL, "disabled" boolean NOT NULL, "type" varchar NOT NULL, "defaultValue" varchar NOT NULL, "formId" integer, "ratingSteps" integer, "ratingShape" varchar, "idx" integer, CONSTRAINT "FK_2d83d8a334dd66445db13f92b77" FOREIGN KEY ("formId") REFERENCES "form" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)');
    await queryRunner.query('INSERT INTO "form_field"("id", "title", "description", "slug", "required", "disabled", "type", "defaultValue", "formId", "ratingSteps", "ratingShape", "idx") SELECT "id", "title", "description", "slug", "required", "disabled", "type", "defaultValue", "formId", "ratingSteps", "ratingShape", "idx" FROM "temporary_form_field"');
    await queryRunner.query('DROP TABLE "temporary_form_field"');
    await queryRunner.query('ALTER TABLE "form_field" RENAME TO "temporary_form_field"');
    await queryRunner.query('CREATE TABLE "form_field" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" text NOT NULL, "slug" varchar, "required" boolean NOT NULL, "disabled" boolean NOT NULL, "type" varchar NOT NULL, "defaultValue" varchar NOT NULL, "formId" integer, "ratingSteps" integer, "ratingShape" varchar, "idx" integer, CONSTRAINT "FK_2d83d8a334dd66445db13f92b77" FOREIGN KEY ("formId") REFERENCES "form" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)');
    await queryRunner.query('INSERT INTO "form_field"("id", "title", "description", "slug", "required", "disabled", "type", "defaultValue", "formId", "ratingSteps", "ratingShape", "idx") SELECT "id", "title", "description", "slug", "required", "disabled", "type", "defaultValue", "formId", "ratingSteps", "ratingShape", "idx" FROM "temporary_form_field"');
    await queryRunner.query('DROP TABLE "temporary_form_field"');
  }
}
