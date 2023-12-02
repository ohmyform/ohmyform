import { MigrationInterface, QueryRunner } from 'typeorm'

export class anonymous1641193946192 implements MigrationInterface {
  name = 'anonymous1641193946192'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `form` ADD `anonymousSubmission` tinyint NOT NULL DEFAULT 0');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `form` DROP COLUMN `anonymousSubmission`');
  }
}
