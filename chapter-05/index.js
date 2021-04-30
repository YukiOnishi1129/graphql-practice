const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const expressPlayground = require("graphql-playground-middleware-express")
  .default;
const { readFileSync } = require("fs");

const typeDefs = readFileSync("./typeDefs.graphql", "UTF-8");
const resolvers = require("./resolvers");

// express()を呼び出し、Expressアプリケーションを作成
const app = express();

// サーバーインスタンスを作成
// その際、typeDefs(スキーマ)とリソルバを引数に取る
const server = new ApolloServer({
  typeDefs, // スキーマ
  resolvers, // リゾルバ
});

// applyMiddleware()を呼び出し、Expressにミドルウェアを追加する
server.applyMiddleware({ app });

// ホームルートを作成
app.get("/", (req, res) => res.end("Welcome to the PhotoShare API"));
// playground用のルート
app.get("/playground", expressPlayground({ endpoint: "/graphql" }));

// 特定のポートでリッスンする
app.listen({ port: 4000 }, () => {
  console.log(
    `GraphQL Server running @ http://localhost:4000${server.graphqlPath}`
  );
});
