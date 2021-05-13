import { IResolvers } from "graphql-tools";
import { GraphQLScalarType } from "graphql";
import {
  AuthenticateResponse,
  MutationRegisterArgs,
  QueryLoginArgs,
  User,
  FriendShip,
  AllUser,
} from "../generated";
/* services */
import { getMyUser } from "@Services/User";
import { getFriendShipByUserId } from "@Services/FriendShip";

export const UserResolvers: IResolvers = {
  Query: {
    async me(): Promise<User | undefined> {
      const user = await getMyUser(1);
      const friends = await getFriendShipByUserId(1);

      if (!user) {
        return;
      }

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        createdAt: user.createdAt,
        friends: friends,
      };
    },
    async allUsers(): Promise<AllUser[]> {
      return [
        {
          id: 1,
          name: "タロー",
          email: "test@gmail.com",
          avatar: "",
          friendFlg: true,
          createdAt: new Date(),
        },
        {
          id: 2,
          name: "ジロー",
          email: "test@gmail.com",
          avatar: "",
          friendFlg: false,
          createdAt: new Date(),
        },
      ];
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
