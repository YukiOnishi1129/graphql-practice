/**
 *  User
 *  @package Services
 */
require("module-alias/register");
import { createConnection, getRepository, Not } from "typeorm";
/* graphQL */
import {
  User as UserGraphQLType,
  AllUser as AllUserGraphQLType,
} from "@GraphQL/generated";
/* models */
import { User } from "@Models/index";
/* types */
import { UserType } from "@Types/User";

/**
 * ログインユーザー取得
 * @param {number} userId
 * @returns {UserTypes}
 */
export const getMyUser = async (
  userId: number
): Promise<UserGraphQLType | undefined> => {
  const connection = await createConnection();
  const userRepository = getRepository(User);

  const user = await userRepository.findOne(userId);

  await connection.close();

  if (!user) {
    return;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    createdAt: user.createdAt,
    friends: [],
  };
};

/**
 * 全てのユーザーを取得(自分以外のユーザー)
 * @param userId
 * @returns
 */
export const getAllUser = async (
  userId: number
): Promise<User[] | undefined> => {
  const connection = await createConnection();

  const userRepository = getRepository(User);

  const users = await userRepository.find({
    id: Not(userId),
  });

  await connection.close();
  if (!users) {
    return;
  }

  return users;
};

export const getMyUserRelation = async (
  userId: number
): Promise<User | undefined> => {
  const connection = await createConnection();

  const userRepository = getRepository(User);

  // 成功！
  const users = await userRepository.findOne(userId, {
    relations: ["friendships"],
  });

  await connection.close();
  return users;
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

// const users = await connection
//   .getRepository(User)
//   .createQueryBuilder("user")
//   .where("user.id = :id", { id: userId })
//   .getOne();

// 成功
// const users = await connection
//   .getRepository(User)
//   .createQueryBuilder("user") // alias
//   // 第一引数：FriendShipModelのManyToOneの記述
//   // 第二引数：alias
//   // .innerJoin("user.friendships", "friendships")
//   .innerJoinAndSelect("user.friendships", "friendships")
//   .where("user.id = :id", { id: userId })
//   .getOne();

// const queryRunner = connection.createQueryRunner();

// const result = await queryRunner.query(
//   `select users.id as id, users.name as name, users.email as email, users.avatar as avatar,  target.user_id, target.friend_user_id, target.name as friendName, target.created_at as createdAt
//    from users
//    INNER JOIN
//    (select z.user_id, z.friend_user_id, u.name, z.created_at from friendship z INNER JOIN users u ON z.user_id = u.id) target
//    ON target.friend_user_id = users.id
//    WHERE users.id = ?
//    `,
//   [userId]
// );
/**
 * SQL
 * select users.id as u_id, users.name as u_name, target.user_id,target.friend_user_id, target.name
 * from users
 * INNER JOIN
 * (select z.user_id, z.friend_user_id, u.name from friendship z INNER JOIN users u ON z.user_id = u.id) target
 * ON users.id = target.friend_user_id
 */

// const target = await connection
//   .getRepository(FriendShip)
//   .createQueryBuilder("target")
//   // .select("target.id", "id")
//   .where("target.user_id = :id", { id: userId })
//   .getQuery();
// console.log(target);

// const allUser = await connection
//   .getRepository(User)
//   .createQueryBuilder("user") // alias
//   // 第一引数：FriendShipModelのManyToOneの記述
//   // 第二引数：alias
//   // .innerJoinAndSelect("user.friendships", "friendships")
//   .innerJoin(
//     "(" + target + ")",
//     "target",
//     "target.target_friend_user_id = user.id"
//   )
//   .where("user.id = :id", { id: userId })
//   .getOne();

// console.log("aaaa");
// console.log(allUser);

// const users = await connection
//   .createQueryBuilder()
//   .select(["users.id", "users.name"])
//   .from(User, "users")
//   // .innerJoin("users.id", "friendship", "friendship.user_id = users.id")
//   .where("users.id = :id", { id: userId })
//   .getOne();
