/**
 * リゾルバ ChatResolvers
 * @package graphql
 */
import { ApolloError } from "apollo-server-errors";
import { IResolvers } from "graphql-tools";
/* graphql */
import {
  Chat as ChatGraphQLType,
  Statement as StatementGraphQLType,
  StatementResponse as StatementResponseGraphQLType,
} from "../generated";
/* Services */
import { getMyUser } from "@Services/User";
import { getChat, getChatList } from "@Services/Chat";
import { registerStatement } from "@Services/Statement";
import {
  getChatStatementRelations,
  registerRelations,
} from "@Services/ChatStatementRelations";
/* types */
import { ResolverContextType } from "@Types/index";

/**
 * ChatResolvers
 */
export const ChatResolvers: IResolvers = {
  /**
   * Query
   */
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
        // statementなしのreturn
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
          statement: [],
          createdAt: chatData.createdAt,
        };
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

    /**
     * allChat
     * @param parent
     * @param args
     * @param param2
     * @returns
     */
    async allChat(
      parent,
      args,
      { currentUser }: ResolverContextType
    ): Promise<ChatGraphQLType[] | undefined> {
      // contextのuserデータの有無を確認
      if (!currentUser) {
        throw new ApolloError("認証エラーです。", "401");
      }
      const chatList = await getChatList(currentUser.id);

      if (!chatList) {
        throw new ApolloError("リクエストエラーです。", "400");
      }

      const responseChatList: ChatGraphQLType[] = [];
      for await (const chatData of chatList) {
        const responseChat: ChatGraphQLType = {
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
          statement: [],
          createdAt: chatData.createdAt,
        };
        const relations = await getChatStatementRelations(chatData.id);
        if (!relations) {
          responseChatList.push(responseChat);
          continue;
        }
        console.log("hhh");

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
          responseChat.statement = statement;
        }

        responseChatList.push(responseChat);
      }
      return responseChatList;
    },
  },

  /**
   * Mutation
   */
  Mutation: {
    /**
     * postStatement
     * @param parent
     * @param args
     * @param param2
     */
    async postStatement(
      parent,
      args,
      { currentUser }: ResolverContextType
    ): Promise<StatementResponseGraphQLType> {
      // contextのuserデータの有無を確認
      if (!currentUser) {
        throw new ApolloError("認証エラーです。", "401");
      }

      if (!args?.input?.chatId || !args?.input?.statement) {
        throw new ApolloError("リクエストパラメータエラーです。", "400");
      }

      /**
       * 1. Statementテーブルへレコードを登録
       * serviceにDB処理の関数を作成
       */
      const statementData = await registerStatement(
        args.input.chatId,
        args.input.statement
      );

      if (!statementData) {
        throw new ApolloError("DBエラーです。", "500");
      }

      const userData = await getMyUser(statementData.userId);

      if (!userData) {
        throw new ApolloError("DBエラーです。", "500");
      }

      /**
       * 2. 分岐処理
       *  ChatStatementRelationsにレコードがあるか確認
       *  レコードがない場合、relationsテーブルへ新規登録
       */
      const relations = await getChatStatementRelations(args.input.chatId);

      if (!relations) {
        const registerRelationsData = await registerRelations(
          args.input.chatId,
          args.input.statement
        );

        if (!registerRelationsData) {
          throw new ApolloError("DBエラーです。", "500");
        }
      }

      return {
        statement: {
          id: statementData.id,
          user: {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            avatar: userData.avatar,
            createdAt: userData.createdAt,
            friends: [],
          },
          content: statementData.content,
          createdAt: statementData.createdAt,
        },
      };
    },
  },
};
