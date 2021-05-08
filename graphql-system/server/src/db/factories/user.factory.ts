/**
 * user.factory
 * @package DB
 */
require("module-alias/register");
import Faker from "faker";
import { define } from "typeorm-seeding";
import bcrypt from "bcrypt";
/* models */
import { User } from "@Models/User";
/* utils */
import { userSeedState } from "@Utils/init";
/* types */
import { UserType } from "@Types/User";

/**
 * define User
 */
define(User, (faker: typeof Faker) => {
  //   const user: Omit<UserType, "id"> = {
  //     name: faker.name.findName(),
  //     email: faker.internet.email(),
  //     password: "pwd",
  //     avatar: faker.image.avatar(),
  //   };

  const user = new User();
  user.name = faker.name.findName();
  user.email = faker.internet.email();
  user.password = "password";
  user.avatar = faker.image.avatar();

  return user;
});
