const { ApolloServer } = require("apollo-server");

// 文字列としてスキーマ定義
/**
 * スキーマ
 */
const typeDefs = `
    type Query {
        totalPhotos: Int!
    }
`;

/**
 * リゾルバ
 */
const resolvers = {
  Query: {
    //  Queryを作成する場合、必ずスキーマ名と同じリソルバ関数を定義する
    totalPhotos: () => 42,
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
