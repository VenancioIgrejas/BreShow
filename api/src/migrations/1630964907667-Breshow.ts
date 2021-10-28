import {MigrationInterface, QueryRunner, Table} from "typeorm";
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

        // await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(300) NOT NULL, "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedBy" character varying(300) NOT NULL, "internalComment" character varying(300), "name" character varying(300) NOT NULL, "username" character varying(300) NOT NULL, "password" character varying(300) NOT NULL, "description" character varying(300) NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.createTable(new Table({
            name: "user",
            columns: [...baseColumns,
            {
                name: "username",
                type: "varchar",
                length: "50",
                isNullable: false,
                isUnique: true,
            },{
                name: "password",
                type: "varchar",
                length: "20",
                isNullable: true
            },{
                name: "email",
                type: "varchar",
                length: "100",
                isNullable: true
            }]
        }),true);

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
                name: "cel",
                type: "varchar",
                length: "30",
                isNullable: true
            },{
                name: "perPrice",
                type: "number",
                isNullable: false
            },{
                name: "info",
                type: "varchar",
                length: "100",
                isNullable: true
            }]
        }),true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "provider"`);

    }

}
