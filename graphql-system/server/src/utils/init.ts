/**
 * init
 * @package utils
 */
require("module-alias/register");
/* types */
import { UserType } from "@Types/User";

/**
 * user初期値
 */
export const userSeedState: Omit<UserType, "id"> = {
  name: "",
  email: "",
  password: "",
  avatar: "",
};
