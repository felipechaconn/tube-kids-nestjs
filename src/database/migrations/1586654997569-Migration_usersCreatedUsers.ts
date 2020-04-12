import {MigrationInterface, QueryRunner} from "typeorm";

export class MigrationUsersCreatedUsers1586654997569 implements MigrationInterface {
    name = 'MigrationUsersCreatedUsers1586654997569'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `videos` DROP FOREIGN KEY `FK_4ef7e70319a6b2997fac2586036`", undefined);
        await queryRunner.query("ALTER TABLE `videos` CHANGE `creatorIdUser` `creatorIdUser` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_8fed0d31ea0cfecc0030f478b88`", undefined);
        await queryRunner.query("ALTER TABLE `users` CHANGE `user_rol` `user_rol` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `videos` ADD CONSTRAINT `FK_4ef7e70319a6b2997fac2586036` FOREIGN KEY (`creatorIdUser`) REFERENCES `users`(`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_8fed0d31ea0cfecc0030f478b88` FOREIGN KEY (`user_rol`) REFERENCES `roles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_8fed0d31ea0cfecc0030f478b88`", undefined);
        await queryRunner.query("ALTER TABLE `videos` DROP FOREIGN KEY `FK_4ef7e70319a6b2997fac2586036`", undefined);
        await queryRunner.query("ALTER TABLE `users` CHANGE `user_rol` `user_rol` int NULL DEFAULT 'NULL'", undefined);
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_8fed0d31ea0cfecc0030f478b88` FOREIGN KEY (`user_rol`) REFERENCES `roles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `videos` CHANGE `creatorIdUser` `creatorIdUser` int NULL DEFAULT 'NULL'", undefined);
        await queryRunner.query("ALTER TABLE `videos` ADD CONSTRAINT `FK_4ef7e70319a6b2997fac2586036` FOREIGN KEY (`creatorIdUser`) REFERENCES `users`(`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

}
