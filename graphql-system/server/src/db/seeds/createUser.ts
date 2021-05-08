/**
 * CreateUser
 * @package DB
 */
require("module-alias/register");
import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import bcrypt from "bcrypt";
/* models */
import { User } from "@Models/User";

/**
 * CreateUsers
 */
export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    //   パスワードのハッシュ化
    const hashPassword = await bcrypt.hash("password", 10);
    // const result = await bcrypt.compare("password", hashPassword);
    // console.log("判定");
    // console.log(result);

    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          name: "Timber",
          email: "timber@gmail.com",
          password: hashPassword,
          avatar: "",
        },
      ])
      .execute();
  }
}
