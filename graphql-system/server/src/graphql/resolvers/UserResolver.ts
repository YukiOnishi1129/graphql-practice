/**
 * リゾルバ UserResolvers
 * @package graphql
 */
import { ApolloError } from "apollo-server-errors";
import { IResolvers } from "graphql-tools";
import bcrypt from "bcrypt";
// import * as jwtWebToken from "jsonwebtoken";
/* graphql */
import {
  AuthenticateResponse,
  User as UserGraphQLType,
  AllUser as AllUserGraphQLType,
} from "../generated";
/* services */
import {
  getMyUser,
  getAllUser,
  loginAuth,
  registerUser,
  isNotSameEmailUser,
} from "@Services/User";
import { getFriendShipByUserId, isUserFriendship } from "@Services/FriendShip";
/* types */
import { ResolverContextType } from "@Types/index";

/**
 * UserResolvers
 */
export const UserResolvers: IResolvers = {
  /**
   * Query
   */
  Query: {
    /**
     * me
     * @param parent
     * @param args
     * @param {User} {currentUser}
     * @returns
     */
    async me(
      parent,
      args,
      { currentUser }: ResolverContextType
    ): Promise<UserGraphQLType> {
      // contextのuserデータの有無を確認
      if (!currentUser) {
        throw new ApolloError("認証エラーです。", "401");
      }
      const user = await getMyUser(currentUser.id);
      const friends = await getFriendShipByUserId(currentUser.id);

      if (!user) {
        throw new ApolloError("リクエストエラーです。", "400");
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
    async allUsers(
      parent,
      args,
      { currentUser }: ResolverContextType
    ): Promise<AllUserGraphQLType[] | undefined> {
      // contextのuserデータの有無を確認
      if (!currentUser) {
        throw new ApolloError("認証エラーです。", "401");
      }
      const users = await getAllUser(currentUser.id);

      if (!users) {
        throw new ApolloError("リクエストエラーです。", "400");
      }
      const allUsers: AllUserGraphQLType[] = [];
      for await (const user of users) {
        allUsers.push({
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          friendFlg: await isUserFriendship(user.id, currentUser.id),
          createdAt: user.createdAt,
        });
      }

      return allUsers;
    },
  },

  /**
   * Mutation
   */
  Mutation: {
    /**
     * ログイン処理
     * @param parent
     * @param args
     * @returns
     */
    async login(parent, args): Promise<AuthenticateResponse> {
      if (!args?.input?.email || !args?.input?.password) {
        throw new ApolloError("リクエストパラメータエラーです。", "40０");
      }
      const user = await loginAuth(args.input.email, args.input.password);
      if (!user) {
        throw new ApolloError("認証エラーです。", "401");
      }
      return {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          createdAt: user.createdAt,
          friends: [],
        },
        token: user.token,
      };
    },
    /**
     * 会員登録処理
     * @param parent
     * @param args
     * @returns
     */
    async register(parent, args): Promise<AuthenticateResponse> {
      // メールアドレス重複判定
      if (!(await isNotSameEmailUser(args.input.email))) {
        throw new ApolloError(
          "メールアドレスが同じユーザーが存在します。他のメールアドレスを登録してください。",
          "400"
        );
      }
      // パスワードhash化
      const hashPassword = await bcrypt.hash(args.input.password, 10);
      // const token = await jwtWebToken.sign({}, jwt.secret, jwt.expiresIn);
      // トークン発行
      const token = Math.random().toString(32).substring(2);
      const user = await registerUser(
        args.input.name,
        args.input.email,
        hashPassword,
        token
      );
      if (!user) {
        throw new ApolloError(
          "システムエラー。会員登録が失敗しました。",
          "500"
        );
      }
      return {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          createdAt: user.createdAt,
          friends: [],
        },
        token,
      };
    },
  },

  /**
   * playgroundの記述はこんな感じ
   * mutation signup($input: RegisterInput!) {
      register(input:$input) {
        user {
          id
          name
          email
          avatar
          createdAt
        }
        token
      }
    }
   *
   */

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
