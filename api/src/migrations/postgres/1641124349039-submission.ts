import { MigrationInterface, QueryRunner } from 'typeorm'

export class submission1641124349039 implements MigrationInterface {
  name = 'submission1641124349039'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "submission_field" RENAME COLUMN "fieldType" TO "type"');
    await queryRunner.query('ALTER TABLE "submission_field" RENAME COLUMN "fieldValue" TO "content"');
    await queryRunner.query('ALTER TABLE "submission_field" ALTER COLUMN "content" type text');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "submission_field" ALTER COLUMN "content" type character varying');
    await queryRunner.query('ALTER TABLE "submission_field" RENAME COLUMN "content" TO "fieldValue"');
    await queryRunner.query('ALTER TABLE "submission_field" RENAME COLUMN "type" TO "fieldType"');
  }
}
