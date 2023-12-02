import { QueryRunner } from 'typeorm'
import { SqliteMigration } from '../sqlite.migration'

export class submission1641124349039 extends SqliteMigration {
  name = 'submission1641124349039'

  public async realUp(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "temporary_submission_field" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "submissionId" integer, "fieldId" integer, "type" varchar NOT NULL, "content" text NOT NULL, CONSTRAINT "FK_5befa92da2370b7eb1cab6ae30a" FOREIGN KEY ("fieldId") REFERENCES "form_field" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_16fae661ce5b10f27abe2e524a0" FOREIGN KEY ("submissionId") REFERENCES "submission" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)');
    await queryRunner.query('INSERT INTO "temporary_submission_field"("id", "submissionId", "type", "content", "fieldId") SELECT "id", "submissionId", "fieldType", "fieldValue", "fieldId" FROM "submission_field"');
    await queryRunner.query('DROP TABLE "submission_field"');
    await queryRunner.query('ALTER TABLE "temporary_submission_field" RENAME TO "submission_field"');
  }

  public async realDown(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "submission_field" RENAME TO "temporary_submission_field"');
    await queryRunner.query('CREATE TABLE "submission_field" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "fieldType" varchar NOT NULL, "fieldValue" varchar NOT NULL, "submissionId" integer, "fieldId" integer, CONSTRAINT "FK_5befa92da2370b7eb1cab6ae30a" FOREIGN KEY ("fieldId") REFERENCES "form_field" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_16fae661ce5b10f27abe2e524a0" FOREIGN KEY ("submissionId") REFERENCES "submission" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)');
    await queryRunner.query('INSERT INTO "submission_field"("id", "submissionId", "fieldType", "fieldValue", "fieldId") SELECT "id", "submissionId", "type", "content", "fieldId" FROM "temporary_submission_field"');
    await queryRunner.query('DROP TABLE "temporary_submission_field"');
  }
}
