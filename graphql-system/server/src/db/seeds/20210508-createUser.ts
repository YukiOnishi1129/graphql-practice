/**
 * CreateUser
 * @package DB
 */
require("module-alias/register");
import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import bcrypt from "bcrypt";
/* models */
import { User } from "@Models/index";
/* types */
import { UserType } from "@Types/index";

/**
 * CreateUsers
 */
export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    //   パスワードのハッシュ化
    const hashPassword = await bcrypt.hash("password", 10);
    // const result = await bcrypt.compare("password", hashPassword);
    const initUserState: Omit<UserType, "id">[] = [
      {
        name: "Timber",
        email: "timber@gmail.com",
        password: hashPassword,
        avatar: "",
        token: "htyvci21h",
      },
      {
        name: "bake",
        email: "bake@gmail.com",
        password: hashPassword,
        avatar: "",
        token: "ndfhtvol78f",
      },
      {
        name: "kenny",
        email: "kenny@gmail.com",
        password: hashPassword,
        avatar: "",
        token: "kkhtvo2987",
      },
    ];

    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      // TODO: 仮設定
      .values(initUserState)
      .execute();

    // factoryを使った自動生成
    // await factory(User)().createMany(10);
  }
}
