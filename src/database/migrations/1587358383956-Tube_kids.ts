import {MigrationInterface, QueryRunner} from "typeorm";

export class TubeKids1587358383956 implements MigrationInterface {
    name = 'TubeKids1587358383956'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `videos` (`id_video` int NOT NULL AUTO_INCREMENT, `name_video` varchar(255) NOT NULL, `description_video` varchar(500) NOT NULL, `link_video` varchar(100) NOT NULL, `creatorIdUser` int NULL, PRIMARY KEY (`id_video`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `users` (`id_user` int NOT NULL AUTO_INCREMENT, `email_user` varchar(255) NOT NULL, `firstName_user` varchar(255) NOT NULL, `lastName_user` varchar(255) NOT NULL, `country_user` varchar(255) NOT NULL, `birthday_user` datetime NOT NULL, `phone_user` varchar(255) NOT NULL, `status` varchar(8) NOT NULL DEFAULT 'INACTIVE', `vcode` varchar(255) NOT NULL, `password_user` varchar(255) NOT NULL, UNIQUE INDEX `IDX_6a96700476ddd642b04e29c85f` (`email_user`), PRIMARY KEY (`id_user`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `kids` (`id_kid` int NOT NULL AUTO_INCREMENT, `email_kid` varchar(255) NOT NULL, `firstName_kid` varchar(50) NOT NULL, `username_kid` varchar(100) NOT NULL, `birthday_kid` date NOT NULL, `pin_kid` varchar(50) NOT NULL, `creatorIdUser` int NULL, UNIQUE INDEX `IDX_2bb31a5c6a48576b79e25e924d` (`email_kid`), PRIMARY KEY (`id_kid`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `videos` ADD CONSTRAINT `FK_4ef7e70319a6b2997fac2586036` FOREIGN KEY (`creatorIdUser`) REFERENCES `users`(`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `kids` ADD CONSTRAINT `FK_971527fdd446d2108000cf5d3e7` FOREIGN KEY (`creatorIdUser`) REFERENCES `users`(`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `kids` DROP FOREIGN KEY `FK_971527fdd446d2108000cf5d3e7`", undefined);
        await queryRunner.query("ALTER TABLE `videos` DROP FOREIGN KEY `FK_4ef7e70319a6b2997fac2586036`", undefined);
        await queryRunner.query("DROP INDEX `IDX_2bb31a5c6a48576b79e25e924d` ON `kids`", undefined);
        await queryRunner.query("DROP TABLE `kids`", undefined);
        await queryRunner.query("DROP INDEX `IDX_6a96700476ddd642b04e29c85f` ON `users`", undefined);
        await queryRunner.query("DROP TABLE `users`", undefined);
        await queryRunner.query("DROP TABLE `videos`", undefined);
    }

}
