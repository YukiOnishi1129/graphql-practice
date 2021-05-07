import { IResolvers } from "graphql-tools";
import { GraphQLScalarType } from "graphql";
import {
  AuthenticateResponse,
  MutationRegisterArgs,
  QueryLoginArgs,
  User,
  FriendShip,
} from "../generated";

export const UserResolvers: IResolvers = {
  Query: {
    async me(): Promise<User> {
      const friendShips: FriendShip[] = [
        {
          user: {
            id: 1,
            name: "タロー",
            email: "test@gmail.com",
            avatar: "image.jpeg",
            createdAt: new Date(),
            friends: [],
          },
          createdAt: new Date(),
        },
      ];
      // const friendShip: FriendShip = {
      //   user: {
      //     id: 2,
      //     name: "ジロー",
      //     email: "test@gamail.com",
      //     avatar: "",
      //     createdAt: new Date(),
      //     friends: [],
      //   },
      //   createdAt: new Date(),
      // };
      return {
        id: 1,
        name: "タロー",
        email: "test@gmail.com",
        avatar: "image.jpeg",
        createdAt: new Date(),
        friends: friendShips,
      };
    },
    async login(_: void, args: QueryLoginArgs): Promise<AuthenticateResponse> {
      return {
        token: "token",
      };
    },
  },
  Mutation: {
    async register(
      _: void,
      args: MutationRegisterArgs
    ): Promise<AuthenticateResponse> {
      return {
        token: "token",
      };
    },
  },

  // カスタムスカラーのリゾルバを作成
  // DateTime: new GraphQLScalarType({
  //   name: "DateTime",
  //   description: "A valid date time value",
  //   // DateTimeを処理するための3つの関数
  //   parseValue: (value) => new Date(value),
  //   serialize: (value) => new Date(value).toISOString(),
  //   // parseLiteral: (ast) => ast.value,
  // }),
};

// 引数ない場合のクエリ
/**
 * query getUser {
  user {
    id
    name
  }
}
 * 
 */

// 引数ある場合のクエリ
/**
 * query login {
  login(email: "data@gmail.com", password: "pwd") {
    token
  }
}
 */

// 1対多の場合のクエリ
/**
 *
query getMe {
  me {
    id
    name
    email
    avatar
    friends {
      user {
        name
        createdAt
      }
    }
  }
}
 */
