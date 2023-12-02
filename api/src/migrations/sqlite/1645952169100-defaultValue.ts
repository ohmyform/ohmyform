import { QueryRunner } from 'typeorm'
import { SqliteMigration } from '../sqlite.migration'

export class defaultValue1645952169100 extends SqliteMigration {
  name = 'defaultValue1645952169100'

  public async realUp(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "form_field" RENAME COLUMN "value" TO "defaultValue"');
  }

  public async realDown(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "form_field" RENAME COLUMN "defaultValue" TO "value"');
  }
}
