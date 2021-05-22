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
 * userIdとfriendUserIdに紐づくデータ所得
 * @param userId
 * @param friendUserId
 * @returns
 */
export const getFriedShipByUserIdAndFriendId = async (
  userId: number,
  friendUserId: number
): Promise<FriendShip | undefined> => {
  const connection = await createConnection();
  const friendRepository = getRepository(FriendShip);

  const friendShips = await friendRepository.findOne({
    where: { userId: userId, friendUserId: friendUserId },
  });
  await connection.close();

  // レコードがない場合
  if (!friendShips) {
    return;
  }

  return friendShips;
};

/**
 * 登録処理
 * @param myUserId
 * @param friendUserId
 * @returns
 */
export const registerFriendShip = async (
  myUserId: number,
  friendUserId: number
): Promise<
  | ({
      userId: number;
      friendUserId: number;
    } & FriendShip)
  | undefined
> => {
  const connection = await createConnection();
  const friendRepository = getRepository(FriendShip);

  try {
    const registerData = await friendRepository.save({
      userId: myUserId,
      friendUserId: friendUserId,
    });
    await connection.close();
    return registerData;
  } catch (error) {
    console.log(error);
    await connection.close();
  }
};

/**
 * 論理削除処理
 * @param myUserId
 * @param friendUserId
 * @returns
 */

export const logicDeleteFriendShip = async (
  myUserId: number,
  friendUserId: number
): Promise<
  | ({
      userId: number;
      friendUserId: number;
    } & FriendShip)
  | undefined
> => {
  const connection = await createConnection();
  const friendRepository = getRepository(FriendShip);

  const friendShipData = await friendRepository.findOne({
    where: { userId: myUserId, friendUserId: friendUserId },
  });

  if (!friendShipData) {
    return;
  }

  friendShipData.deleteFlg = true;

  try {
    const registerData = await friendRepository.save(friendShipData);
    await connection.close();
    return registerData;
  } catch (error) {
    console.log(error);
    await connection.close();
  }
};

/**
 * 論理削除解除処理
 * @param myUserId
 * @param friendUserId
 * @returns
 */

export const restoreFriendShip = async (
  myUserId: number,
  friendUserId: number
): Promise<
  | ({
      userId: number;
      friendUserId: number;
    } & FriendShip)
  | undefined
> => {
  const connection = await createConnection();
  const friendRepository = getRepository(FriendShip);

  const friendShipData = await friendRepository.findOne({
    where: { userId: myUserId, friendUserId: friendUserId },
  });

  if (!friendShipData) {
    return;
  }

  friendShipData.deleteFlg = false;

  try {
    const registerData = await friendRepository.save(friendShipData);
    await connection.close();
    return registerData;
  } catch (error) {
    console.log(error);
    await connection.close();
  }
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
