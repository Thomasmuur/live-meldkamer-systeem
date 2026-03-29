import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserMigration1774802641808 implements MigrationInterface {
  name = 'UserMigration1774802641808';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`auth_accounts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL, \`provider\` varchar(255) NOT NULL, \`provider_user_id\` varchar(255) NOT NULL, \`display_name\` varchar(255) NULL, \`avatar\` varchar(255) NULL, \`access_token\` text NULL, \`refresh_token\` text NULL, \`expires_at\` bigint NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_2ceb600b17d2f17432d798e8a4\` (\`provider\`, \`provider_user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`avatar\` varchar(255) NOT NULL, \`is_admin\` tinyint NOT NULL DEFAULT 0, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`auth_accounts\` ADD CONSTRAINT \`FK_ec59c6a7dc808a04c4ae2f603f7\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`auth_accounts\` DROP FOREIGN KEY \`FK_ec59c6a7dc808a04c4ae2f603f7\``,
    );
    await queryRunner.query(`DROP TABLE \`users\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_2ceb600b17d2f17432d798e8a4\` ON \`auth_accounts\``,
    );
    await queryRunner.query(`DROP TABLE \`auth_accounts\``);
  }
}
