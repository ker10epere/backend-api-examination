import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1656064481251 implements MigrationInterface {
  name = "migration1656064481251";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("ALTER TABLE `users` DROP COLUMN `token`");
    await queryRunner.query("ALTER TABLE `users` ADD `token` text NULL");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("ALTER TABLE `users` DROP COLUMN `token`");
    await queryRunner.query(
      "ALTER TABLE `users` ADD `token` varchar(255) NULL"
    );
  }
}
