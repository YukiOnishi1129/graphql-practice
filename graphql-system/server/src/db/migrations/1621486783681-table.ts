import {MigrationInterface, QueryRunner} from "typeorm";

export class table1621486783681 implements MigrationInterface {
    name = 'table1621486783681'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `avatar` varchar(255) NOT NULL, `token` varchar(255) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `delete_flg` tinyint NOT NULL DEFAULT 0, UNIQUE INDEX `IDX_97672ac88f789774dd47f7c8be` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `friendship` (`id` int NOT NULL AUTO_INCREMENT, `user_id` int NOT NULL, `friend_user_id` int NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `delete_flg` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `statements` (`id` int NOT NULL AUTO_INCREMENT, `user_id` int NOT NULL, `content` varchar(255) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `delete_flg` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `chat_statement_relations` (`id` int NOT NULL AUTO_INCREMENT, `chat_id` int NOT NULL, `statement_id` int NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `delete_flg` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `chats` (`id` int NOT NULL AUTO_INCREMENT, `user_id` int NOT NULL, `friend_user_id` int NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `delete_flg` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `friendship` ADD CONSTRAINT `FK_8885973a7c761a7f8fc0fc673f6` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `friendship` ADD CONSTRAINT `FK_19bf8f330a4e7a05c70c54d2e31` FOREIGN KEY (`friend_user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `statements` ADD CONSTRAINT `FK_da838838004c4ff8990e7b4de9a` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `chat_statement_relations` ADD CONSTRAINT `FK_252a65e8f253b4723b27c33f398` FOREIGN KEY (`chat_id`) REFERENCES `chats`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `chat_statement_relations` ADD CONSTRAINT `FK_cee5c55d45a24d51b65e7cdcb7a` FOREIGN KEY (`statement_id`) REFERENCES `statements`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `chats` ADD CONSTRAINT `FK_b6c92d818d42e3e298e84d94414` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `chats` ADD CONSTRAINT `FK_69d0cd1ad6cfd4da86cad8d32fc` FOREIGN KEY (`friend_user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `chats` DROP FOREIGN KEY `FK_69d0cd1ad6cfd4da86cad8d32fc`");
        await queryRunner.query("ALTER TABLE `chats` DROP FOREIGN KEY `FK_b6c92d818d42e3e298e84d94414`");
        await queryRunner.query("ALTER TABLE `chat_statement_relations` DROP FOREIGN KEY `FK_cee5c55d45a24d51b65e7cdcb7a`");
        await queryRunner.query("ALTER TABLE `chat_statement_relations` DROP FOREIGN KEY `FK_252a65e8f253b4723b27c33f398`");
        await queryRunner.query("ALTER TABLE `statements` DROP FOREIGN KEY `FK_da838838004c4ff8990e7b4de9a`");
        await queryRunner.query("ALTER TABLE `friendship` DROP FOREIGN KEY `FK_19bf8f330a4e7a05c70c54d2e31`");
        await queryRunner.query("ALTER TABLE `friendship` DROP FOREIGN KEY `FK_8885973a7c761a7f8fc0fc673f6`");
        await queryRunner.query("DROP TABLE `chats`");
        await queryRunner.query("DROP TABLE `chat_statement_relations`");
        await queryRunner.query("DROP TABLE `statements`");
        await queryRunner.query("DROP TABLE `friendship`");
        await queryRunner.query("DROP INDEX `IDX_97672ac88f789774dd47f7c8be` ON `users`");
        await queryRunner.query("DROP TABLE `users`");
    }

}
