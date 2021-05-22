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
import {
  getFriendShipByUserId,
  getFriedShipByUserIdAndFriendId,
  isUserFriendship,
  registerFriendShip,
  restoreFriendShip,
} from "@Services/FriendShip";
import {
  getChatByUserIdAndFriendId,
  registerChat,
  restoreChat,
} from "@Services/Chat";
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

    async createFriend(parent, args, { currentUser }: ResolverContextType) {
      // contextのuserデータの有無を確認
      if (!currentUser) {
        throw new ApolloError("認証エラーです。", "401");
      }

      if (!args?.input?.friendUserId) {
        throw new ApolloError("リクエストパラメータエラーです。", "400");
      }
      const friendUserId = args.input.friendUserId;
      /**
       * 分岐処理
       * friendShipテーブルにレコードがあるか？
       * 1. あればdeleteFlgをtrueに変更
       * 2. なければ新規登録
       * 自分とパートナーどちらのテーブルにも
       */
      const friendshipData = await getFriedShipByUserIdAndFriendId(
        currentUser.id,
        friendUserId
      );

      // friendshipレコードがない場合
      if (!friendshipData) {
        // Chatテーブルにレコードがある場合はエラー
        if (await getChatByUserIdAndFriendId(currentUser.id, friendUserId)) {
          throw new ApolloError("整合性エラーです。", "400");
        }
        /**
         * FriendShipテーブルへ新規登録
         */
        // 自分のレコード登録
        const registerMyFriendShip = await registerFriendShip(
          currentUser.id,
          friendUserId
        );
        if (!registerMyFriendShip) {
          throw new ApolloError("DBエラーです。", "500");
        }
        // 友達のレコード登録
        const registerYourFriendShip = await registerFriendShip(
          friendUserId,
          currentUser.id
        );
        if (!registerYourFriendShip) {
          throw new ApolloError("DBエラーです。", "500");
        }

        /**
         * Chatテーブル新規登録
         */
        // 自分のレコード
        const registerMyChat = await registerChat(currentUser.id, friendUserId);
        if (!registerMyChat) {
          throw new ApolloError("DBエラーです。", "500");
        }
        const registerYourChat = await registerChat(
          friendUserId,
          currentUser.id
        );
        // 友達のレコード登録
        if (!registerYourChat) {
          throw new ApolloError("DBエラーです。", "500");
        }

        // friendshipテーブルにレコードがある場合
      } else {
        if (!friendshipData.deleteFlg) {
          throw new ApolloError(
            "整合性エラーです。論理削除されていません。",
            "400"
          );
        }

        // chatテーブルの確認
        const chatData = await getChatByUserIdAndFriendId(
          currentUser.id,
          friendUserId
        );
        // Chatテーブルにレコードがある場合はエラー
        if (!chatData || !chatData.deleteFlg) {
          throw new ApolloError(
            "整合性エラーです。chatデータが存在しないか、論理削除されていません。",
            "400"
          );
        }

        /**
         * friendShipのdeleteFlgをtrueにする
         */
        // 自分のレコード
        const restoreMyFriendShipData = await restoreFriendShip(
          currentUser.id,
          friendUserId
        );
        if (!restoreMyFriendShipData) {
          throw new ApolloError("DBエラーです。", "500");
        }
        // 友達のレコード
        const restoreYourFriendShipData = await restoreFriendShip(
          friendUserId,
          currentUser.id
        );
        if (!restoreYourFriendShipData) {
          throw new ApolloError("DBエラーです。", "500");
        }

        /**
         * chatのdeleteFlgをtrueにする
         */
        // 自分のレコード
        const restoreMyChat = await restoreChat(currentUser.id, friendUserId);
        if (!restoreMyChat) {
          throw new ApolloError("DBエラーです。", "500");
        }
        // 友達のレコード
        const restoreYourChat = await restoreChat(friendUserId, currentUser.id);
        if (!restoreYourChat) {
          throw new ApolloError("DBエラーです。", "500");
        }
      }

      /**
       * userテーブル取得
       */
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

      return {
        allUsers: allUsers,
      };
    },
  },

  /**
   * playgroundの記述はこんな感じ
   * 
   * mutation signin($loginInput: LoginInput!) {
      login(input:$loginInput) {
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

    mutation signup($registerInput: RegisterInput!) {
      register(input:$registerInput) {
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

  /**
   * inputはこんな感じ
   * {
      "loginInput": {
        "email": "humiko@gmail.com",
        "password": "password"
      },
      "registerInput": {
        "name": "ニャンコ",
        "email": "nyanko@gmail.com",
        "password": "password"
      }
    }
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
