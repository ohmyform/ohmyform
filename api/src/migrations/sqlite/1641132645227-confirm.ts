import { MigrationInterface, QueryRunner } from 'typeorm'

export class confirm1641132645227 implements MigrationInterface {
  name = 'confirm1641132645227'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "firstName" varchar, "lastName" varchar, "email" varchar(255) NOT NULL, "username" varchar(255) NOT NULL, "passwordHash" varchar NOT NULL, "salt" varchar, "provider" varchar NOT NULL, "roles" text NOT NULL, "language" varchar NOT NULL, "resetPasswordToken" varchar, "resetPasswordExpires" datetime, "token" varchar, "apiKey" varchar, "created" datetime NOT NULL DEFAULT (datetime(\'now\')), "lastModified" datetime NOT NULL DEFAULT (datetime(\'now\')), "emailVerified" boolean NOT NULL DEFAULT (0), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))');
    await queryRunner.query('INSERT INTO "temporary_user"("id", "firstName", "lastName", "email", "username", "passwordHash", "salt", "provider", "roles", "language", "resetPasswordToken", "resetPasswordExpires", "token", "apiKey", "created", "lastModified") SELECT "id", "firstName", "lastName", "email", "username", "passwordHash", "salt", "provider", "roles", "language", "resetPasswordToken", "resetPasswordExpires", "token", "apiKey", "created", "lastModified" FROM "user"');
    await queryRunner.query('DROP TABLE "user"');
    await queryRunner.query('ALTER TABLE "temporary_user" RENAME TO "user"');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user" RENAME TO "temporary_user"');
    await queryRunner.query('CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "firstName" varchar, "lastName" varchar, "email" varchar(255) NOT NULL, "username" varchar(255) NOT NULL, "passwordHash" varchar NOT NULL, "salt" varchar, "provider" varchar NOT NULL, "roles" text NOT NULL, "language" varchar NOT NULL, "resetPasswordToken" varchar, "resetPasswordExpires" datetime, "token" varchar, "apiKey" varchar, "created" datetime NOT NULL DEFAULT (datetime(\'now\')), "lastModified" datetime NOT NULL DEFAULT (datetime(\'now\')), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))');
    await queryRunner.query('INSERT INTO "user"("id", "firstName", "lastName", "email", "username", "passwordHash", "salt", "provider", "roles", "language", "resetPasswordToken", "resetPasswordExpires", "token", "apiKey", "created", "lastModified") SELECT "id", "firstName", "lastName", "email", "username", "passwordHash", "salt", "provider", "roles", "language", "resetPasswordToken", "resetPasswordExpires", "token", "apiKey", "created", "lastModified" FROM "temporary_user"');
    await queryRunner.query('DROP TABLE "temporary_user"');
  }
}
