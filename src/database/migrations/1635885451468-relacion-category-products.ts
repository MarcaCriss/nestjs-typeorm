import {MigrationInterface, QueryRunner} from "typeorm";

export class relacionCategoryProducts1635885451468 implements MigrationInterface {
    name = 'relacionCategoryProducts1635885451468'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product_categories_category\` (\`productId\` int NOT NULL, \`categoryId\` int NOT NULL, INDEX \`IDX_342d06dd0583aafc156e076379\` (\`productId\`), INDEX \`IDX_15520e638eb4c46c4fb2c61c4b\` (\`categoryId\`), PRIMARY KEY (\`productId\`, \`categoryId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`product_categories_category\` ADD CONSTRAINT \`FK_342d06dd0583aafc156e0763790\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`product_categories_category\` ADD CONSTRAINT \`FK_15520e638eb4c46c4fb2c61c4b4\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_categories_category\` DROP FOREIGN KEY \`FK_15520e638eb4c46c4fb2c61c4b4\``);
        await queryRunner.query(`ALTER TABLE \`product_categories_category\` DROP FOREIGN KEY \`FK_342d06dd0583aafc156e0763790\``);
        await queryRunner.query(`DROP INDEX \`IDX_15520e638eb4c46c4fb2c61c4b\` ON \`product_categories_category\``);
        await queryRunner.query(`DROP INDEX \`IDX_342d06dd0583aafc156e076379\` ON \`product_categories_category\``);
        await queryRunner.query(`DROP TABLE \`product_categories_category\``);
        await queryRunner.query(`DROP TABLE \`category\``);
    }

}
