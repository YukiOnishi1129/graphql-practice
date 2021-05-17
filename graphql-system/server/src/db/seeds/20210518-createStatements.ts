/**
 * CreateStatement
 * @package DB
 */
require("module-alias/register");
import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import bcrypt from "bcrypt";
/* models */
import { Statement } from "@Models/index";

// export default class CreateStatement implements Seeder {
//   public async run(factory: Factory, connection: Connection): Promise<void> {
//     await connection
//       .createQueryBuilder()
//       .insert()
//       .into(Statement)
//       .value([{}])
//       .execute();
//   }
// }
