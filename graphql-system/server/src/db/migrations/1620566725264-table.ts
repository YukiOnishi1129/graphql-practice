import { MigrationInterface, QueryRunner } from "typeorm";

export class table1620566725264 implements MigrationInterface {
  name = "table1620566725264";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `avatar` varchar(255) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `delete_flg` tinyint NOT NULL DEFAULT 0, UNIQUE INDEX `IDX_97672ac88f789774dd47f7c8be` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB"
    );
    await queryRunner.query(
      "CREATE TABLE `friend_ship` (`id` int NOT NULL AUTO_INCREMENT, `user_id` int NOT NULL, `friend_user_id` int NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `delete_flg` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (`id`)) ENGINE=InnoDB"
    );
    await queryRunner.query(
      "ALTER TABLE `friend_ship` ADD CONSTRAINT `FK_c2e91802f173cb7e47488c34a3e` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION"
    );
    await queryRunner.query(
      "ALTER TABLE `friend_ship` ADD CONSTRAINT `FK_ee38ba1ff6c62ab140c65f34b9f` FOREIGN KEY (`friend_user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE `friend_ship` DROP FOREIGN KEY `FK_ee38ba1ff6c62ab140c65f34b9f`"
    );
    await queryRunner.query(
      "ALTER TABLE `friend_ship` DROP FOREIGN KEY `FK_c2e91802f173cb7e47488c34a3e`"
    );
    await queryRunner.query("DROP TABLE `friend_ship`");
    await queryRunner.query(
      "DROP INDEX `IDX_97672ac88f789774dd47f7c8be` ON `users`"
    );
    await queryRunner.query("DROP TABLE `users`");
  }
}
