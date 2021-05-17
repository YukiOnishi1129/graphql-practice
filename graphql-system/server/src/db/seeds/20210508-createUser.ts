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
      // TODO: 仮設定
      .values([
        {
          name: "Timber",
          email: "timber@gmail.com",
          password: hashPassword,
          avatar: "",
        },
        {
          name: "bake",
          email: "bake@gmail.com",
          password: hashPassword,
          avatar: "",
        },
        {
          name: "kenny",
          email: "kenny@gmail.com",
          password: hashPassword,
          avatar: "",
        },
      ])
      .execute();

    // factoryを使った自動生成
    // await factory(User)().createMany(10);
  }
}
