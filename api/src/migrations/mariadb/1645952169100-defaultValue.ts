import { MigrationInterface, QueryRunner } from 'typeorm'

export class defaultValue1645952169100 implements MigrationInterface {
  name = 'defaultValue1645952169100'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `form_field` RENAME COLUMN `value` TO `defaultValue`');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `form_field` RENAME COLUMN `defaultValue` TO `value`');
  }
}
