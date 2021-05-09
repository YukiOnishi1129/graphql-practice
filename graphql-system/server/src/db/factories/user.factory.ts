/**
 * user.factory
 * @package DB
 */
require("module-alias/register");
import Faker from "faker";
import { define } from "typeorm-seeding";
/* models */
import { User } from "@Models/User";

/**
 * define User
 */
define(User, (faker: typeof Faker) => {
  const user = new User();
  user.name = faker.name.findName();
  user.email = faker.internet.email();
  user.password = "password";
  user.avatar = faker.image.avatar();

  return user;
});
