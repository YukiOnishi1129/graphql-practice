/**
 *  FriendShip
 *  @package Services
 */
require("module-alias/register");
import { createConnection, getRepository, createQueryBuilder } from "typeorm";
/* graphQL */
import {
  FriendShip as FriendShipGraphQLType,
  Scalars,
} from "@GraphQL/generated";
/* models */
import { User, FriendShip } from "@Models/index";
/* types */
import { UserType } from "@Types/User";
import { FriendShipType } from "@Types/FriendShip";

interface Friend {
  user: UserType;
  createdAt?: Date;
}

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
    where: { userId: userId },
    relations: ["friend"],
  });

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

  await connection.close();

  return friends;
};
