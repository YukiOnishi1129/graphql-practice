import { MigrationInterface, QueryRunner } from "typeorm";

export class createUserTable1620457481462 implements MigrationInterface {
  name = "createUserTable1620457481462";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `avatar` varchar(255) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `delete_flg` tinyint NOT NULL DEFAULT 0, UNIQUE INDEX `IDX_51b8b26ac168fbe7d6f5653e6c` (`name`), UNIQUE INDEX `IDX_97672ac88f789774dd47f7c8be` (`email`), UNIQUE INDEX `IDX_450a05c0c4de5b75ac8d34835b` (`password`), UNIQUE INDEX `IDX_36a3fc9cb216b550beee2dce26` (`avatar`), PRIMARY KEY (`id`)) ENGINE=InnoDB"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "DROP INDEX `IDX_36a3fc9cb216b550beee2dce26` ON `users`"
    );
    await queryRunner.query(
      "DROP INDEX `IDX_450a05c0c4de5b75ac8d34835b` ON `users`"
    );
    await queryRunner.query(
      "DROP INDEX `IDX_97672ac88f789774dd47f7c8be` ON `users`"
    );
    await queryRunner.query(
      "DROP INDEX `IDX_51b8b26ac168fbe7d6f5653e6c` ON `users`"
    );
    await queryRunner.query("DROP TABLE `users`");
  }
}
