/**
 * CreateChat
 * @package DB
 */
require("module-alias/register");
import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
/* models */
import { Chat } from "@Models/index";
/* types */
import { ChatType } from "@Types/index";

export default class CreateChat implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const chatInitState: ChatType[] = [
      {
        id: 1,
        userId: 1,
        friendUserId: 2,
      },
      {
        id: 2,
        userId: 2,
        friendUserId: 1,
      },
      {
        id: 3,
        userId: 1,
        friendUserId: 3,
      },
      {
        id: 4,
        userId: 3,
        friendUserId: 1,
      },
      {
        id: 5,
        userId: 1,
        friendUserId: 4,
      },
      {
        id: 6,
        userId: 4,
        friendUserId: 1,
      },
    ];

    await connection
      .createQueryBuilder()
      .insert()
      .into(Chat)
      .values(chatInitState)
      .execute();
  }
}
