/**
 * CreateFriendShip
 * @package DB
 */
require("module-alias/register");
import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
/* models */
import { FriendShip } from "@Models/FriendShip";

export default class CreateFriendShip implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(FriendShip)
      .values([
        {
          userId: 1,
          friendUserId: 2,
        },
        {
          userId: 1,
          friendUserId: 3,
        },
        {
          userId: 2,
          friendUserId: 1,
        },
        {
          userId: 3,
          friendUserId: 1,
        },
      ])
      .execute();
  }
}
