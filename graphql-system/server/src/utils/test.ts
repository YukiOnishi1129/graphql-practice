/**
 * test logic
 * @package utils
 */
require("module-alias/register");
/* GraphQL */
import {
  AllUser,
  Chat as ChatGraphQLType,
  Statement as StatementGraphQLType,
} from "@GraphQL/generated";
/* Services */
import {
  getMyUser,
  getMyUserRelation,
  getAllUser,
  isNotSameEmailUser,
} from "@Services/User";
import { getFriendShipByUserId, isUserFriendship } from "@Services/FriendShip";
import { getChat } from "@Services/Chat";
import { registerStatement } from "@Services/Statement";
import { getChatStatementRelations } from "@Services/ChatStatementRelations";

const fetch = async () => {
  const data = await registerStatement(1, "こんにちは");
  console.log(data);
};

fetch();
