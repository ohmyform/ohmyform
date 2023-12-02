import { MigrationInterface, QueryRunner } from 'typeorm'

export class initial1619723437787 implements MigrationInterface {
  name = 'initial1619723437787'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE `form_field_logic` (`id` int NOT NULL AUTO_INCREMENT, `formula` varchar(255) NOT NULL, `action` varchar(10) NOT NULL, `visible` tinyint NULL, `require` tinyint NULL, `disable` tinyint NULL, `enabled` tinyint NOT NULL, `fieldId` int NULL, `jumpToId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `form_field_option` (`id` int NOT NULL AUTO_INCREMENT, `key` varchar(255) NULL, `title` varchar(255) NULL, `value` varchar(255) NOT NULL, `fieldId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `form_field` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `description` text NOT NULL, `slug` varchar(255) NULL, `required` tinyint NOT NULL, `disabled` tinyint NOT NULL, `type` varchar(255) NOT NULL, `value` varchar(255) NOT NULL, `formId` int NULL, `ratingSteps` int NULL, `ratingShape` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `form_hook` (`id` int NOT NULL AUTO_INCREMENT, `enabled` tinyint NOT NULL, `url` varchar(255) NOT NULL, `format` varchar(255) NULL, `formId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `form_notification` (`id` int NOT NULL AUTO_INCREMENT, `subject` varchar(255) NULL, `htmlTemplate` varchar(255) NULL, `enabled` tinyint NOT NULL, `toEmail` varchar(255) NULL, `fromEmail` varchar(255) NULL, `formId` int NULL, `fromFieldId` int NULL, `toFieldId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `page_button` (`id` int NOT NULL AUTO_INCREMENT, `url` varchar(255) NULL, `action` varchar(255) NULL, `text` varchar(255) NOT NULL, `bgColor` varchar(255) NULL, `activeColor` varchar(255) NULL, `color` varchar(255) NULL, `pageId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `page` (`id` int NOT NULL AUTO_INCREMENT, `show` tinyint NOT NULL, `title` varchar(255) NULL, `paragraph` text NULL, `buttonText` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `submission_field` (`id` int NOT NULL AUTO_INCREMENT, `fieldType` varchar(255) NOT NULL, `fieldValue` varchar(255) NOT NULL, `submissionId` int NULL, `fieldId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `firstName` varchar(255) NULL, `lastName` varchar(255) NULL, `email` varchar(255) NOT NULL, `username` varchar(255) NOT NULL, `passwordHash` varchar(255) NOT NULL, `salt` varchar(255) NULL, `provider` varchar(255) NOT NULL, `roles` text NOT NULL, `language` varchar(255) NOT NULL, `resetPasswordToken` varchar(255) NULL, `resetPasswordExpires` datetime NULL, `token` varchar(255) NULL, `apiKey` varchar(255) NULL, `created` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `lastModified` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`), UNIQUE INDEX `IDX_78a916df40e02a9deb1c4b75ed` (`username`), PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `form_visitor` (`id` int NOT NULL AUTO_INCREMENT, `referrer` varchar(255) NULL, `ipAddr` varchar(255) NOT NULL, `created` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `formId` int NULL, `geoLocationCountry` varchar(255) NULL, `geoLocationCity` varchar(255) NULL, `deviceLanguage` varchar(255) NULL, `deviceType` varchar(255) NULL, `deviceName` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `submission` (`id` int NOT NULL AUTO_INCREMENT, `ipAddr` varchar(255) NOT NULL, `tokenHash` varchar(255) NOT NULL, `timeElapsed` decimal NOT NULL, `percentageComplete` decimal NOT NULL, `created` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `lastModified` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `formId` int NULL, `visitorId` int NULL, `userId` int NULL, `geoLocationCountry` varchar(255) NULL, `geoLocationCity` varchar(255) NULL, `deviceLanguage` varchar(255) NULL, `deviceType` varchar(255) NULL, `deviceName` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `form` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `language` varchar(10) NOT NULL, `showFooter` tinyint NOT NULL, `isLive` tinyint NOT NULL, `created` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `lastModified` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `adminId` int NULL, `startPageId` int NULL, `endPageId` int NULL, `analyticsGacode` varchar(255) NULL, `designFont` varchar(255) NULL, `designColorsBackground` varchar(255) NULL, `designColorsQuestion` varchar(255) NULL, `designColorsAnswer` varchar(255) NULL, `designColorsButton` varchar(255) NULL, `designColorsButtonactive` varchar(255) NULL, `designColorsButtontext` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('ALTER TABLE `form_field_logic` ADD CONSTRAINT `FK_6098b83f6759445d8cfdd03d545` FOREIGN KEY (`fieldId`) REFERENCES `form_field`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `form_field_logic` ADD CONSTRAINT `FK_4a8019f2b753cfb3216dc3001a6` FOREIGN KEY (`jumpToId`) REFERENCES `form_field`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `form_field_option` ADD CONSTRAINT `FK_c4484ad12c2c56db31dffdbfe97` FOREIGN KEY (`fieldId`) REFERENCES `form_field`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `form_field` ADD CONSTRAINT `FK_2d83d8a334dd66445db13f92b77` FOREIGN KEY (`formId`) REFERENCES `form`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `form_hook` ADD CONSTRAINT `FK_bbeb4d224d8857fd5a458538a30` FOREIGN KEY (`formId`) REFERENCES `form`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `form_notification` ADD CONSTRAINT `FK_a9ed55144108ded893b502d6321` FOREIGN KEY (`formId`) REFERENCES `form`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `form_notification` ADD CONSTRAINT `FK_0876741ce2acdaee4553d7a3bbd` FOREIGN KEY (`fromFieldId`) REFERENCES `form_field`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `form_notification` ADD CONSTRAINT `FK_4915ebae53e09b732322d0ff6ed` FOREIGN KEY (`toFieldId`) REFERENCES `form_field`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `page_button` ADD CONSTRAINT `FK_d9f099286b75fa0034dcd8cf7c2` FOREIGN KEY (`pageId`) REFERENCES `page`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `submission_field` ADD CONSTRAINT `FK_16fae661ce5b10f27abe2e524a0` FOREIGN KEY (`submissionId`) REFERENCES `submission`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `submission_field` ADD CONSTRAINT `FK_5befa92da2370b7eb1cab6ae30a` FOREIGN KEY (`fieldId`) REFERENCES `form_field`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `form_visitor` ADD CONSTRAINT `FK_72ade6c3a3e55d1fce94300f8b6` FOREIGN KEY (`formId`) REFERENCES `form`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `submission` ADD CONSTRAINT `FK_6090e1d5cbf3433ffd14e3b53e7` FOREIGN KEY (`formId`) REFERENCES `form`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `submission` ADD CONSTRAINT `FK_95b73c7faf2c199f005fda5e8c8` FOREIGN KEY (`visitorId`) REFERENCES `form_visitor`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `submission` ADD CONSTRAINT `FK_7bd626272858ef6464aa2579094` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `form` ADD CONSTRAINT `FK_a7cb33580bca2b362e5e34fdfcd` FOREIGN KEY (`adminId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `form` ADD CONSTRAINT `FK_023d9cf1d97e93facc96c86ca70` FOREIGN KEY (`startPageId`) REFERENCES `page`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `form` ADD CONSTRAINT `FK_e5d158932e43cfbf9958931ee01` FOREIGN KEY (`endPageId`) REFERENCES `page`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `form` DROP FOREIGN KEY `FK_e5d158932e43cfbf9958931ee01`');
    await queryRunner.query('ALTER TABLE `form` DROP FOREIGN KEY `FK_023d9cf1d97e93facc96c86ca70`');
    await queryRunner.query('ALTER TABLE `form` DROP FOREIGN KEY `FK_a7cb33580bca2b362e5e34fdfcd`');
    await queryRunner.query('ALTER TABLE `submission` DROP FOREIGN KEY `FK_7bd626272858ef6464aa2579094`');
    await queryRunner.query('ALTER TABLE `submission` DROP FOREIGN KEY `FK_95b73c7faf2c199f005fda5e8c8`');
    await queryRunner.query('ALTER TABLE `submission` DROP FOREIGN KEY `FK_6090e1d5cbf3433ffd14e3b53e7`');
    await queryRunner.query('ALTER TABLE `form_visitor` DROP FOREIGN KEY `FK_72ade6c3a3e55d1fce94300f8b6`');
    await queryRunner.query('ALTER TABLE `submission_field` DROP FOREIGN KEY `FK_5befa92da2370b7eb1cab6ae30a`');
    await queryRunner.query('ALTER TABLE `submission_field` DROP FOREIGN KEY `FK_16fae661ce5b10f27abe2e524a0`');
    await queryRunner.query('ALTER TABLE `page_button` DROP FOREIGN KEY `FK_d9f099286b75fa0034dcd8cf7c2`');
    await queryRunner.query('ALTER TABLE `form_notification` DROP FOREIGN KEY `FK_4915ebae53e09b732322d0ff6ed`');
    await queryRunner.query('ALTER TABLE `form_notification` DROP FOREIGN KEY `FK_0876741ce2acdaee4553d7a3bbd`');
    await queryRunner.query('ALTER TABLE `form_notification` DROP FOREIGN KEY `FK_a9ed55144108ded893b502d6321`');
    await queryRunner.query('ALTER TABLE `form_hook` DROP FOREIGN KEY `FK_bbeb4d224d8857fd5a458538a30`');
    await queryRunner.query('ALTER TABLE `form_field` DROP FOREIGN KEY `FK_2d83d8a334dd66445db13f92b77`');
    await queryRunner.query('ALTER TABLE `form_field_option` DROP FOREIGN KEY `FK_c4484ad12c2c56db31dffdbfe97`');
    await queryRunner.query('ALTER TABLE `form_field_logic` DROP FOREIGN KEY `FK_4a8019f2b753cfb3216dc3001a6`');
    await queryRunner.query('ALTER TABLE `form_field_logic` DROP FOREIGN KEY `FK_6098b83f6759445d8cfdd03d545`');
    await queryRunner.query('DROP TABLE `form`');
    await queryRunner.query('DROP TABLE `submission`');
    await queryRunner.query('DROP TABLE `form_visitor`');
    await queryRunner.query('DROP INDEX `IDX_78a916df40e02a9deb1c4b75ed` ON `user`');
    await queryRunner.query('DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` ON `user`');
    await queryRunner.query('DROP TABLE `user`');
    await queryRunner.query('DROP TABLE `submission_field`');
    await queryRunner.query('DROP TABLE `page`');
    await queryRunner.query('DROP TABLE `page_button`');
    await queryRunner.query('DROP TABLE `form_notification`');
    await queryRunner.query('DROP TABLE `form_hook`');
    await queryRunner.query('DROP TABLE `form_field`');
    await queryRunner.query('DROP TABLE `form_field_option`');
    await queryRunner.query('DROP TABLE `form_field_logic`');
  }

}
