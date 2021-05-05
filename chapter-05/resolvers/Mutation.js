const { authorizeWithGithub, uploadStream } = require("../lib");
const path = require("path");
const fetch = require("node-fetch");
const { ObjectID } = require("mongodb");

// 1. ユニークIDをインクリメントするための変数
// let _id = 0;

module.exports = {
  //   第一引数は親オブジェクトへの参照
  //   リゾルバの第２引数: {name, description}のオブジェクト
  // postPhoto: (parent, args) => {
  //   // 2. 新しい写真を作成し、idを生成する
  //   const newPhoto = {
  //     id: _id++,
  //     ...args.input,
  //     created: new Date(),
  //   };
  //   photos.push(newPhoto);

  //   // 3. 新しい写真を返す
  //   return newPhoto;
  // },

  /**
   * 写真登録処理
   * typeDef.graphql記載の「Mutation postPhoto(input: PostPhotoInput!): Photo! 」
   * 戻り値が型リゾルバの「Photo」のparentに対応する
   * @param {*} parent
   * @param {PostPhotoInput!} args
   * @param {*} param2
   * @returns
   */
  async postPhoto(parent, args, { db, currentUser, pubsub }) {
    // 1. コンテキストにユーザーがなければエラーを投げる
    if (!currentUser) {
      throw new Error("only an authorized user can post a photo");
    }

    // 2. 現在のユーザーのIDとphotoを保存する
    const newPhoto = {
      ...args.input,
      userID: currentUser.githubLogin,
      created: new Date(),
    };

    // 3.新しいphotoを追加し、データベースが生成したIDを取得する
    const { insertedIds } = await db.collection("photos").insert(newPhoto);
    newPhoto.id = insertedIds[0];

    const toPath = path.join(
      __dirname,
      "..",
      "assets",
      "photos",
      `${photo.id}.jpg`
    );

    const { stream } = await args.input.file;
    await uploadStream(input.file, toPath);

    // データをサブスクリプションリゾルバに送る
    pubsub.publish("photo-added", { newPhoto: photo });

    return newPhoto;
  },

  /**
   * GithubLogin処理
   * @param {*} parent
   * @param {String!} param1
   * @param {*} param2
   * @returns
   */
  async githubAuth(parent, { code }, { db, pubsub }) {
    // 1. Githubからデータを取得する
    let {
      message,
      access_token,
      avatar_url,
      login,
      name,
    } = await authorizeWithGithub({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code,
    });

    // 2. メッセージがある場合は何らかのエラーが発生している
    if (message) {
      throw new Error(message);
    }

    // 3. データを一つのオブジェクトにまとめる
    let latestUserInfo = {
      name,
      githubLogin: login,
      githubToken: access_token,
      avatar: avatar_url,
    };

    // 4. 新しい情報を元にレコードを追加したり更新する
    const {
      ops: [user],
      result,
    } = await db
      .collection("users")
      .replaceOne({ githubLogin: login }, latestUserInfo, { upsert: true });

    // サブスクリプション起動
    result.upserted && pubsub.publish("user-added", { newUser: user });

    // 5. ユーザーデータとトークンを返す
    return { user, token: access_token };
  },

  /**
   * フェイクユーザー作成
   * @param {*} root
   * @param {Int!} param1
   * @param {*} param2
   * @returns
   */
  addFakeUsers: async (parent, { count }, { db, pubsub }) => {
    const randomUserApi = `https://randomuser.me/api/?results=${count}`;
    const { results } = await fetch(randomUserApi).then((res) => res.json());

    const users = results.map((r) => ({
      githubLogin: r.login.username,
      name: `${r.name.first} ${r.name.last}`,
      avatar: r.picture.thumbnail,
      githubToken: r.login.sha1,
    }));

    await db.collection("users").insertMany(users);

    const newUsers = await db
      .collection("users")
      .find()
      .sort({ _id: -1 })
      .limit(count)
      .toArray();

    // サブスクリプション起動
    newUsers.forEach((newUser) => pubsub.publish("user-added", { newUser }));

    return users;
  },

  /**
   * フェイクユーザー認証処理
   * @param {*} parent
   * @param {String!} param1
   * @param {*} param2
   * @returns
   */
  async fakeUserAuth(parent, { githubLogin }, { db }) {
    const user = await db.collection("users").findOne({ githubLogin });

    if (!user) {
      throw new Error(`Cannot find user with githubLogin "${githubLogin}"`);
    }

    return {
      token: user.githubToken,
      user,
    };
  },
};
