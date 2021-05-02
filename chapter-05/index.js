const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const expressPlayground = require("graphql-playground-middleware-express")
  .default;
const { readFileSync } = require("fs");
const { MongoClient } = require("mongodb");
require("dotenv").config();

// スキーマを定義したテキストファイルを呼び出し
const typeDefs = readFileSync("./typeDefs.graphql", "UTF-8");
// リゾルバを呼び出し
const resolvers = require("./resolvers");

// 非同期関数を作成
async function start() {
  // express()を呼び出し、Expressアプリケーションを作成
  const app = express();

  const MONGO_DB_HOST = process.env.DB_HOST;

  // DBアクセス
  const client = await MongoClient.connect(MONGO_DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const DB_NAME = process.env.DB_NAME;

  const db = client.db(DB_NAME); // DB名が必要

  // DB接続をコンテキストオブジェクトに追加
  // const context = { db };

  // サーバーインスタンスを作成
  // その際、typeDefs(スキーマ)とリソルバを引数に取る
  const server = new ApolloServer({
    typeDefs, // スキーマ
    resolvers, // リゾルバ
    context: async ({ req }) => {
      const githubToken = req.headers.authorization;
      const currentUser = await db.collection("users").findOne({ githubToken });
      return { db, currentUser };
    }, // コンテキスト (リクエストの度にユーザー情報をコンテキストに設定するため、関数の記述で使用)
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
}

// start関数を実行 (DBにアクセスする)
start();
