/**
 * 型リゾルバ
 */
const { GraphQLScalarType } = require("graphql");

module.exports = {
  // トリビアルリゾルバ (ルートに追加されたリゾルバ)
  Photo: {
    id: (parent) => parent.id || parent._id,
    url: (parent) => `/img/photos/${parent._id}.jpg`,
    postedBy: (parent, args, { db }) =>
      db.collection("users").findOne({ githubLogin: parent.userID }),

    taggedUsers: (parent) =>
      tags
        // 対象の写真が関係しているタグの配列を返す
        .filter((tag) => tag.photoID === parent.id)
        // タグの配列をユーザーIDの配列に変換する
        .map((tag) => tag.userID)
        // ユーザーIDの配列をユーザーオブジェクトの配列に変換する
        .map((userID) => users.find((u) => u.githubLogin === userID)),
  },

  User: {
    postedPhotos: (parent) => {
      return photos.filter((p) => p.githubUser === parent.githubLogin);
    },

    inPhotos: (parent) =>
      tags
        // 対象のユーザーが関係しているタグの配列を返す
        .filter((tag) => tag.photoID === parent.id)
        // タグの配列をユーザーIDの配列に変換する
        .map((tag) => tag.photoID)
        // 写真IDの配列を写真オブジェクトの配列に変換する
        .map((photoID) => users.find((p) => p.githubLogin === photoID)),
  },

  // カスタムスカラーのリゾルバを作成
  DateTime: new GraphQLScalarType({
    name: "DateTime",
    description: "A valid date time value",
    // DateTimeを処理するための3つの関数
    parseValue: (value) => new Date(value),
    serialize: (value) => new Date(value).toISOString(),
    parseLiteral: (ast) => ast.value,
  }),
};
