/**
 * CreateStatement
 * @package DB
 */
require("module-alias/register");
import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
/* models */
import { Statement } from "@Models/index";
/* types */
import { StatementType } from "@Types/index";

export default class CreateStatement implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const statementInitState: StatementType[] = [
      {
        id: 1,
        userId: 1,
        content: "おはよう",
      },
      {
        id: 2,
        userId: 2,
        content: "よ！",
      },
      {
        id: 3,
        userId: 3,
        content: "ごきげんよう",
      },
    ];

    await connection
      .createQueryBuilder()
      .insert()
      .into(Statement)
      .values(statementInitState)
      .execute();
  }
}
