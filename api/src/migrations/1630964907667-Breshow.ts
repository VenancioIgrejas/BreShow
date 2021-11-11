import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";
import { TableColumnOptions } from "typeorm/schema-builder/options/TableColumnOptions";
import { TableOptions } from "typeorm/schema-builder/options/TableOptions";

export class Breshow1630964907667 implements MigrationInterface {
    name = 'Breshow1630964907667'

    public async up(queryRunner: QueryRunner): Promise<void> {

        let baseColumns = [{
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()"
        }
        ,{
            name: "isActive",
            type: "boolean",
            default: true,
            isNullable: false,
        },{
            name: "isArchived",
            type: "boolean",
            default: false,
            isNullable: false,
        }
        ,{
            name: "createDateTime",
            type: 'timestamp',
            default: 'now()',
            isNullable: false
        },{
            name: "createdBy",
            type: "varchar",
            length: "50",
            isNullable: false
        },{
            name: "lastChangedDateTime",
            type: 'timestamp',
            default: 'now()',
            isNullable: false
        },{
            name: "lastChangedBy",
            type: "varchar",
            length: "50",
            isNullable: false
        },{
            name: "internalComment",
            type: "varchar",
            length: "300",
            isNullable: true
        }] as TableColumnOptions[];

        await queryRunner.createTable(new Table({
            name: "provider",
            columns: [...baseColumns,
            {
                name: "name",
                type: "varchar",
                length: "50",
                isNullable: false,
                isUnique: false,
            },{
                name: "idUser",
                type: "varchar",
                length: "30",
                isNullable: false
            },{
                name: "cel",
                type: "varchar",
                length: "30",
                isNullable: true
            },{
                name: "perPrice",
                type: "integer",
                isNullable: false
            },{
                name: "info",
                type: "varchar",
                length: "100",
                isNullable: true
            }]
        }),true);

        await queryRunner.createTable(new Table({
            name: "category",
            columns: [...baseColumns,
            {
                name: "name",
                type: "varchar",
                length: "50",
                isNullable: false,
                isUnique: false,
            },{
                name: "idUser",
                type: "varchar",
                length: "30",
                isNullable: false
            }]
        }),true);

        await queryRunner.createTable(new Table({
            name: "product",
            columns: [...baseColumns,
            {
                name: "name",
                type: "varchar",
                length: "50",
                isNullable: false,
                isUnique: false,
            },{
                name: "idUser",
                type: "varchar",
                length: "30",
                isNullable: false
            },{
                name: "category_id",
                type: "uuid",
                isNullable: false
            },{
                name: "provider_id",
                type: "uuid",
                isNullable: false
            },
            {
                name: "comment",
                type: "varchar",
                isNullable: true,
            },{
                name: "price",
                type: "integer",
                isNullable: false
            },{
                name: "quantity",
                type: "integer",
                isNullable: false
            },{
                name: "date_in",
                type: 'timestamp',
                default: 'now()',
                isNullable: false
            }]
        }),true);

        const categoryFK = new TableForeignKey({
            name: 'category_product_fk',
            columnNames: ["category_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "category",
            onDelete: "CASCADE"
        });
        await queryRunner.createForeignKey("product", categoryFK);

        const providerFK = new TableForeignKey({
            name: 'provider_product_fk',
            columnNames: ["provider_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "provider",
            onDelete: "CASCADE"
        });
        await queryRunner.createForeignKey("product", providerFK);
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "category_product_fk";`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "provider_product_fk";`);
        await queryRunner.query(`DROP TABLE "provider"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "product"`);

    }

}
