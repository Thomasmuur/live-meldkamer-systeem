import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateIncidentsTable1774814000505 implements MigrationInterface {
    name = 'CreateIncidentsTable1774814000505'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`incidents\` (\`id\` int NOT NULL AUTO_INCREMENT, \`code\` varchar(4) NOT NULL, \`title\` varchar(255) NOT NULL, \`status\` enum ('open', 'dispatched', 'closed') NOT NULL, \`location_label\` varchar(255) NULL, \`latitude\` varchar(20) NULL, \`longitude\` varchar(20) NULL, \`reporter_name\` varchar(255) NULL, \`closed_at\` datetime NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`incidents\``);
    }

}
