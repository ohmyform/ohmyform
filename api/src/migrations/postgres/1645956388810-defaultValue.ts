import { MigrationInterface, QueryRunner } from 'typeorm'

export class defaultValue1645956388810 implements MigrationInterface {
  name = 'defaultValue1645956388810'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "form_field" ALTER COLUMN "defaultValue" DROP NOT NULL');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('UPDATE "form_field" SET "defaultValue" = \'\' WHERE "defaultValue" IS NULL');
    await queryRunner.query('ALTER TABLE "form_field" ALTER COLUMN "defaultValue" SET NOT NULL');
  }
}
