/**
 * CreateChatStatementRelations
 * @package DB
 */
require("module-alias/register");
import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
/* models */
import { ChatStatementRelations } from "@Models/index";
/* types */
import { ChatStatementRelationsType } from "@Types/index";

export default class CreateChatStatementRelations implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const chatInitState: ChatStatementRelationsType[] = [
      {
        id: 1,
        chatId: 1,
        statementId: 1,
      },
      {
        id: 2,
        chatId: 2,
        statementId: 1,
      },
      {
        id: 3,
        chatId: 1,
        statementId: 2,
      },
      {
        id: 4,
        chatId: 2,
        statementId: 2,
      },
      {
        id: 5,
        chatId: 3,
        statementId: 3,
      },
      {
        id: 6,
        chatId: 4,
        statementId: 3,
      },
    ];

    await connection
      .createQueryBuilder()
      .insert()
      .into(ChatStatementRelations)
      .values(chatInitState)
      .execute();
  }
}
