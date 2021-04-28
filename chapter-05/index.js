const { ApolloServer } = require("apollo-server");

// 文字列としてスキーマ定義
/**
 * スキーマ
 */
const typeDefs = `
    type Query {
        totalPhotos: Int!
    }

    type Mutation {
        postPhoto(name: String! description: String): Boolean!
    }
`;

// 写真を格納するための配列を定義
const photos = [];

/**
 * リゾルバ
 */
const resolvers = {
  Query: {
    //  Queryを作成する場合、必ずスキーマ名と同じリソルバ関数を定義する
    totalPhotos: () => photos.length,
  },

  // postPhotoミューテーションと対応するリゾルバ
  Mutation: {
    //   第一引数は親オブジェクトへの参照
    //   リゾルバの第２引数: {name, description}のオブジェクト
    postPhoto(parent, args) {
      photos.push(args);
      return true;
    },
  },
};

// サーバーインスタンスを作成
// その際、typeDefs(スキーマ)とリソルバを引数に取る
const server = new ApolloServer({
  typeDefs, // スキーマ
  resolvers, // リゾルバ
});

// Webサーバー起動
server
  .listen()
  .then(({ url }) => console.log(`GraphQL Service running on ${url}`));
