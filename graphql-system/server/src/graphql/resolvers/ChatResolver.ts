/**
 * リゾルバ ChatResolvers
 * @package graphql
 */
import { IResolvers } from "graphql-tools";
import {
  Chat as ChatGraphQLType,
  Statement as StatementGraphQLType,
} from "../generated";
/* Services */
import { getMyUser } from "@Services/User";
import { getChat } from "@Services/Chat";
import { getChatStatementRelations } from "@Services/ChatStatementRelations";

/**
 * ChatResolvers
 */
export const ChatResolvers: IResolvers = {
  Query: {
    async chat(): Promise<ChatGraphQLType | undefined> {
      // TODO: 引数のuserIdは仮設定
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

      return {
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
    },
  },
};
