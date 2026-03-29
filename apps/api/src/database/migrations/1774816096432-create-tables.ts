import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1774816096432 implements MigrationInterface {
  name = 'CreateTables1774816096432';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`responder_types\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`label\` varchar(5) NOT NULL, \`color_hex\` varchar(6) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`statuses\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`available\` tinyint NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`units\` (\`id\` int NOT NULL AUTO_INCREMENT, \`callsign\` varchar(10) NOT NULL, \`responder_type_id\` int NOT NULL, \`status_id\` int NOT NULL, \`archivedAt\` datetime NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`incident_logs\` (\`id\` int NOT NULL AUTO_INCREMENT, \`incident_id\` int NOT NULL, \`type\` enum ('update', 'closed', 'status_change', 'unit_assigned', 'unit_unassigned') NOT NULL, \`metadata\` json NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`incidentsId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`units\` ADD CONSTRAINT \`FK_05fa520297b3a1ae5627ab16bb1\` FOREIGN KEY (\`responder_type_id\`) REFERENCES \`responder_types\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`units\` ADD CONSTRAINT \`FK_ee7623ba14a7692e7a73d0ca491\` FOREIGN KEY (\`status_id\`) REFERENCES \`statuses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`incident_logs\` ADD CONSTRAINT \`FK_b757fa09ae365ef27fd742e93b5\` FOREIGN KEY (\`incidentsId\`) REFERENCES \`incidents\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`incident_logs\` DROP FOREIGN KEY \`FK_b757fa09ae365ef27fd742e93b5\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`units\` DROP FOREIGN KEY \`FK_ee7623ba14a7692e7a73d0ca491\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`units\` DROP FOREIGN KEY \`FK_05fa520297b3a1ae5627ab16bb1\``,
    );
    await queryRunner.query(`DROP TABLE \`incident_logs\``);
    await queryRunner.query(`DROP TABLE \`units\``);
    await queryRunner.query(`DROP TABLE \`statuses\``);
    await queryRunner.query(`DROP TABLE \`responder_types\``);
  }
}
