/**
 * test logic
 * @package utils
 */
require("module-alias/register");
/* GraphQL */
import { AllUser } from "@GraphQL/generated";
/* Services */
import { getMyUser, getMyUserRelation, getAllUser } from "@Services/User";
import { getFriendShipByUserId, isUserFriendship } from "@Services/FriendShip";

const fetch = async () => {
  // const data = await getMyUser(1);
  // const data = await getMyUserRelation(1);

  const data = await getAllUser(2);

  if (!data) {
    return;
  }

  const allUsers: AllUser[] = [];

  for await (const user of data) {
    // const friendFlg = await isUserFriendship(1, user.id);
    allUsers.push({
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      friendFlg: await isUserFriendship(1, user.id),
      createdAt: user.createdAt,
    });
  }

  console.log(allUsers);
  console.log("dddd");

  // console.log("データ");
  // console.log(data);
  // await getFriendShipByUserId(1);
};

fetch();
