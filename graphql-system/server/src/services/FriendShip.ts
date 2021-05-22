/**
 *  FriendShip
 *  @package Services
 */
require("module-alias/register");
import { createConnection, getRepository } from "typeorm";
/* graphQL */
import { FriendShip as FriendShipGraphQLType } from "@GraphQL/generated";
/* models */
import { FriendShip } from "@Models/index";

/**
 * ユーザーに紐づく友達データを取得
 * @param userId
 * @returns
 */
export const getFriendShipByUserId = async (
  userId: number
): Promise<FriendShipGraphQLType[]> => {
  const connection = await createConnection();
  const friendRepository = getRepository(FriendShip);

  const friendShips = await friendRepository.find({
    where: { userId: userId, deleteFlg: 0 },
    relations: ["friend"],
  });

  await connection.close();

  if (!friendShips.length) {
    return [];
  }

  const friends: FriendShipGraphQLType[] = friendShips.map((data) => {
    return {
      user: {
        id: data.friend.id,
        name: data.friend.name,
        email: data.friend.email,
        password: data.friend.password,
        avatar: data.friend.avatar,
        createdAt: data.friend.createdAt,
        friends: [],
      },
      createdAt: data.createdAt,
    };
  });

  return friends;
};

/**
 * 条件にマッチしたfriendデータの有無確認
 * @param userId
 * @param friendUserId
 * @returns
 */
export const isUserFriendship = async (
  userId: number,
  friendUserId: number
): Promise<boolean> => {
  const connection = await createConnection();
  const friendRepository = getRepository(FriendShip);

  const friendShips = await friendRepository.find({
    where: { userId: userId, friendUserId: friendUserId, deleteFlg: 0 },
  });

  await connection.close();

  // 友人登録がない場合はfalse
  if (!friendShips.length) {
    return false;
  }
  return true;
};
