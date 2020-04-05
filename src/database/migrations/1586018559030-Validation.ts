import {MigrationInterface, QueryRunner} from "typeorm";

export class Validation1586018559030 implements MigrationInterface {
    name = 'Validation1586018559030'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `users` (`id_user` int NOT NULL AUTO_INCREMENT, `email_user` varchar(255) NOT NULL, `firstName_user` varchar(255) NOT NULL, `lastName_user` varchar(255) NOT NULL, `country_user` varchar(255) NOT NULL, `birthday_user` datetime NOT NULL, `phone_user` varchar(255) NOT NULL, `status` varchar(8) NOT NULL DEFAULT 'INACTIVE', `vcode` varchar(255) NOT NULL, `password_user` varchar(255) NOT NULL, UNIQUE INDEX `IDX_6a96700476ddd642b04e29c85f` (`email_user`), PRIMARY KEY (`id_user`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `roles` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `status` varchar(8) NOT NULL DEFAULT 'ACTIVE', PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `user_roles` (`usersIdUser` int NOT NULL, `rolesId` int NOT NULL, INDEX `IDX_8307685ff53e8fe73a3a229e4e` (`usersIdUser`), INDEX `IDX_13380e7efec83468d73fc37938` (`rolesId`), PRIMARY KEY (`usersIdUser`, `rolesId`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `user_roles` ADD CONSTRAINT `FK_8307685ff53e8fe73a3a229e4e7` FOREIGN KEY (`usersIdUser`) REFERENCES `users`(`id_user`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `user_roles` ADD CONSTRAINT `FK_13380e7efec83468d73fc37938e` FOREIGN KEY (`rolesId`) REFERENCES `roles`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user_roles` DROP FOREIGN KEY `FK_13380e7efec83468d73fc37938e`", undefined);
        await queryRunner.query("ALTER TABLE `user_roles` DROP FOREIGN KEY `FK_8307685ff53e8fe73a3a229e4e7`", undefined);
        await queryRunner.query("DROP INDEX `IDX_13380e7efec83468d73fc37938` ON `user_roles`", undefined);
        await queryRunner.query("DROP INDEX `IDX_8307685ff53e8fe73a3a229e4e` ON `user_roles`", undefined);
        await queryRunner.query("DROP TABLE `user_roles`", undefined);
        await queryRunner.query("DROP TABLE `roles`", undefined);
        await queryRunner.query("DROP INDEX `IDX_6a96700476ddd642b04e29c85f` ON `users`", undefined);
        await queryRunner.query("DROP TABLE `users`", undefined);
    }

}
