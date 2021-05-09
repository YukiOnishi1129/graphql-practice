/**
 *  User
 *  @package Services
 */
require("module-alias/register");
import { createConnection, getRepository } from "typeorm";
/* models */
import { User } from "@Models/index";
/* types */
import { UserType } from "@Types/User";

/**
 * ログインユーザー取得
 * @param {number} userId
 * @returns {UserTypes}
 */
export const getMyUser = async (userId: number): Promise<UserType> => {
  const connection = await createConnection();
  const userRepository = getRepository(User);

  const user = await userRepository.findOne(userId);

  if (!user) {
    // return {
    //   id: 0,
    //   name: "",
    //   email: "",
    //   password: "",
    //   avatar: "",
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    //   deleteFlg: false,
    // };
    return userInitState;
  }

  await connection.close();

  return user;
};

// Constants ==============================
/**
 * user初期値
 */
const userInitState: UserType = {
  id: 0,
  name: "",
  email: "",
  password: "",
  avatar: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  deleteFlg: false,
};
