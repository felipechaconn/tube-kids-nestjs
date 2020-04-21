import {MigrationInterface, QueryRunner} from "typeorm";

export class TubeKidsChange1587444111432 implements MigrationInterface {
    name = 'TubeKidsChange1587444111432'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `videos` DROP FOREIGN KEY `FK_4ef7e70319a6b2997fac2586036`", undefined);
        await queryRunner.query("ALTER TABLE `videos` CHANGE `creatorIdUser` `creatorIdUser` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `kids` DROP FOREIGN KEY `FK_971527fdd446d2108000cf5d3e7`", undefined);
        await queryRunner.query("ALTER TABLE `kids` CHANGE `creatorIdUser` `creatorIdUser` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `videos` ADD CONSTRAINT `FK_4ef7e70319a6b2997fac2586036` FOREIGN KEY (`creatorIdUser`) REFERENCES `users`(`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `kids` ADD CONSTRAINT `FK_971527fdd446d2108000cf5d3e7` FOREIGN KEY (`creatorIdUser`) REFERENCES `users`(`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `kids` DROP FOREIGN KEY `FK_971527fdd446d2108000cf5d3e7`", undefined);
        await queryRunner.query("ALTER TABLE `videos` DROP FOREIGN KEY `FK_4ef7e70319a6b2997fac2586036`", undefined);
        await queryRunner.query("ALTER TABLE `kids` CHANGE `creatorIdUser` `creatorIdUser` int NULL DEFAULT 'NULL'", undefined);
        await queryRunner.query("ALTER TABLE `kids` ADD CONSTRAINT `FK_971527fdd446d2108000cf5d3e7` FOREIGN KEY (`creatorIdUser`) REFERENCES `users`(`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `videos` CHANGE `creatorIdUser` `creatorIdUser` int NULL DEFAULT 'NULL'", undefined);
        await queryRunner.query("ALTER TABLE `videos` ADD CONSTRAINT `FK_4ef7e70319a6b2997fac2586036` FOREIGN KEY (`creatorIdUser`) REFERENCES `users`(`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

}
