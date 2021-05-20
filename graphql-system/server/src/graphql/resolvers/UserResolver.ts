/**
 * リゾルバ UserResolvers
 * @package graphql
 */
import { IResolvers } from "graphql-tools";
import * as jwtWebToken from "jsonwebtoken";
/* graphql */
import {
  AuthenticateResponse,
  MutationRegisterArgs,
  User as UserGraphQLType,
  AllUser as AllUserGraphQLType,
} from "../generated";
/* services */
import { getMyUser, getAllUser, loginAuth } from "@Services/User";
import { getFriendShipByUserId, isUserFriendship } from "@Services/FriendShip";

/**
 * UserResolvers
 */
export const UserResolvers: IResolvers = {
  Query: {
    /**
     * me
     * @returns
     */
    async me(): Promise<UserGraphQLType | undefined> {
      // TODO: userIdは仮設定
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

    /**
     * allUsers
     * @returns
     */
    async allUsers(): Promise<AllUserGraphQLType[] | undefined> {
      // TODO: userIdは仮設定
      const users = await getAllUser(1);

      if (!users) {
        return;
      }
      const allUsers: AllUserGraphQLType[] = [];
      for await (const user of users) {
        allUsers.push({
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          friendFlg: await isUserFriendship(user.id, 1), // TODO: userIdは仮設定
          createdAt: user.createdAt,
        });
      }

      return allUsers;
    },
  },
  Mutation: {
    /**
     * ログイン処理
     */
    async login(
      parent,
      { email, password }
    ): Promise<AuthenticateResponse | undefined> {
      const user = await loginAuth(email, password);
      if (!user) {
        return;
      }
      return {
        token: user.token,
      };
    },
    async register(parent, { email, password }): Promise<AuthenticateResponse> {
      // const token = await jwtWebToken.sign({}, jwt.secret, jwt.expiresIn);
      // console.log(token);
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

// const createToken = async ()

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
