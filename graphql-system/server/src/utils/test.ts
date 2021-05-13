/**
 * test logic
 * @package utils
 */
require("module-alias/register");
/* Services */
import { getMyUser, getMyUserRelation } from "@Services/User";
import { getFriendShipByUserId } from "@Services/FriendShip";

const fetch = async () => {
  // const data = await getMyUser(1);
  // const data = await getMyUserRelation(1);

  // console.log("データ");
  // console.log(data);
  await getFriendShipByUserId(1);
};

fetch();
