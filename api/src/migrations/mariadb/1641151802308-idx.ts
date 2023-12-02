import { MigrationInterface, QueryRunner } from 'typeorm'

export class idx1641151802308 implements MigrationInterface {
  name = 'idx1641151802308'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `form_field_logic` ADD `idx` int NULL');
    await queryRunner.query('ALTER TABLE `form_field` ADD `idx` int NULL');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `form_field` DROP COLUMN `idx`');
    await queryRunner.query('ALTER TABLE `form_field_logic` DROP COLUMN `idx`');
  }
}
