import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterUserAddAvatar1626957961762 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("users", 
            new TableColumn({
                name: "avatar",
                type: "varchar",
                isNullable: true, // This can be null because the user may or not set an avatar.
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users", "avatar");
    }

}
