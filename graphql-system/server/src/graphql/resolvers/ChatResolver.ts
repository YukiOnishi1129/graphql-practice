import { IResolvers } from "graphql-tools";
import { Chat, User, Statement } from "../generated";

export const ChatResolvers: IResolvers = {
  Query: {
    async chat(): Promise<Chat> {
      const friend: User = {
        id: 2,
        name: "ジロー",
        email: "test@gmail.com",
        avatar: "image.jpeg",
        createdAt: new Date(),
        friends: [],
      };

      const statement: Statement[] = [
        {
          id: 1,
          user: {
            id: 2,
            name: "ジロー",
            email: "test@gmail.com",
            avatar: "image.jpeg",
            createdAt: new Date(),
            friends: [],
          },
          content: "こんにちは",
          createdAt: new Date(),
        },
        {
          id: 1,
          user: {
            id: 1,
            name: "タロー",
            email: "test@gmail.com",
            avatar: "image.jpeg",
            createdAt: new Date(),
            friends: [],
          },
          content: "ありがとう",
          createdAt: new Date(),
        },
      ];

      return {
        id: 1,
        friend: friend,
        userId: 1,
        statement: statement,
        createdAt: new Date(),
      };
    },
  },
};
