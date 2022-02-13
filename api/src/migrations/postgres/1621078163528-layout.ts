import { MigrationInterface, QueryRunner } from 'typeorm'

export class layout1621078163528 implements MigrationInterface {
  name = 'layout1621078163528'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "form" ADD "designLayout" character varying');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "form" DROP COLUMN "designLayout"');
  }

}
