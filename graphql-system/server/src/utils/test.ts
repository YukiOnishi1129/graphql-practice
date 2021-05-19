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
import { getMyUser, getMyUserRelation, getAllUser } from "@Services/User";
import { getFriendShipByUserId, isUserFriendship } from "@Services/FriendShip";
import { getChat } from "@Services/Chat";
import { getChatStatementRelations } from "@Services/ChatStatementRelations";

const fetch = async () => {
  // const data = await getMyUser(1);
  // const data = await getMyUserRelation(1);

  const chatData = await getChat(1);
  if (!chatData) {
    return;
  }

  const relations = await getChatStatementRelations(chatData.id);

  if (!relations) {
    return;
  }

  const statement: StatementGraphQLType[] = [];

  for await (const relate of relations) {
    const userData = await getMyUser(relate.statement.userId);
    if (!userData) {
      return;
    }

    statement.push({
      id: relate.statement.id,
      user: {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        avatar: userData.avatar,
        createdAt: userData.createdAt,
        friends: [],
      },
      content: relate.statement.content,
      createdAt: relate.statement.createdAt,
    });
  }

  // console.log(chatData);

  const chat: ChatGraphQLType = {
    id: chatData.id,
    friend: {
      id: chatData.friend.id,
      name: chatData.friend.name,
      email: chatData.friend.email,
      avatar: chatData.friend.avatar,
      createdAt: chatData.friend.createdAt,
      friends: [],
    },
    userId: chatData.userId,
    statement: statement,
    createdAt: chatData.createdAt,
  };
};

fetch();
