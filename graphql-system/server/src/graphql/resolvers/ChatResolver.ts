/**
 * リゾルバ ChatResolvers
 * @package graphql
 */
import { ApolloError } from "apollo-server-errors";
import { IResolvers } from "graphql-tools";
import {
  Chat as ChatGraphQLType,
  Statement as StatementGraphQLType,
} from "../generated";
/* Services */
import { getMyUser } from "@Services/User";
import { getChat } from "@Services/Chat";
import { getChatStatementRelations } from "@Services/ChatStatementRelations";
/* types */
import { ResolverContextType } from "@Types/index";

/**
 * ChatResolvers
 */
export const ChatResolvers: IResolvers = {
  Query: {
    /**
     * chat
     * @param parent
     * @param args
     * @param  {UserGraphQLType} {currentUser}
     * @returns
     */
    async chat(
      parent,
      args,
      { currentUser }: ResolverContextType
    ): Promise<ChatGraphQLType> {
      // contextのuserデータの有無を確認
      if (!currentUser) {
        throw new ApolloError("認証エラーです。", "401");
      }

      const chatData = await getChat(currentUser.id);
      if (!chatData) {
        throw new ApolloError("リクエストエラーです。", "400");
      }

      const relations = await getChatStatementRelations(chatData.id);

      if (!relations) {
        throw new ApolloError("リクエストエラーです。", "400");
      }

      const statement: StatementGraphQLType[] = [];

      for await (const relate of relations) {
        const userData = await getMyUser(relate.statement.userId);
        if (!userData) {
          throw new ApolloError("リクエストエラーです。", "400");
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
