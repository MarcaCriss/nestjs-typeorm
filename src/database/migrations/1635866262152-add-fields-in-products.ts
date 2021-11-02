import {MigrationInterface, QueryRunner} from "typeorm";

export class addFieldsInProducts1635866262152 implements MigrationInterface {
    name = 'addFieldsInProducts1635866262152'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`created_at\``);
    }

}
