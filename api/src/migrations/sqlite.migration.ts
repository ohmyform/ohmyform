import { MigrationInterface, QueryRunner } from 'typeorm'

function final(target: object, key: string | symbol, descriptor: PropertyDescriptor) {
  descriptor.writable = false;
}


export abstract class SqliteMigration implements MigrationInterface {
  abstract realUp(queryRunner: QueryRunner): Promise<any>
  abstract realDown(queryRunner: QueryRunner): Promise<any>

  @final
  async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('PRAGMA foreign_keys=off')
    await queryRunner.query('BEGIN TRANSACTION')

    try {
      await this.realUp(queryRunner)

      await queryRunner.query('COMMIT')
    } catch (e) {
      await queryRunner.query('ROLLBACK')

      throw e
    } finally {
      await queryRunner.query('PRAGMA foreign_keys=on')
    }
  }

  @final
  async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('PRAGMA foreign_keys=off')
    await queryRunner.query('BEGIN TRANSACTION')

    try {
      await this.realDown(queryRunner)

      await queryRunner.query('COMMIT')
    } catch (e) {
      await queryRunner.query('ROLLBACK')

      throw e
    } finally {
      await queryRunner.query('PRAGMA foreign_keys=on')
    }
  }
}
