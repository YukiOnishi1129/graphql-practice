const { ApolloServer, PubSub } = require("apollo-server-express");
const express = require("express");
const expressPlayground = require("graphql-playground-middleware-express")
  .default;
const { readFileSync } = require("fs");
const { MongoClient } = require("mongodb");
const { createServer } = require("http");
const path = require("path");
require("dotenv").config();

// スキーマを定義したテキストファイルを呼び出し
const typeDefs = readFileSync("./typeDefs.graphql", "UTF-8");
// リゾルバを呼び出し
const resolvers = require("./resolvers");

// 非同期関数を作成
async function start() {
  // express()を呼び出し、Expressアプリケーションを作成
  const app = express();

  app.use(express.json({ limit: "100mb" }));

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

  const pubsub = new PubSub();
  // サーバーインスタンスを作成
  // その際、typeDefs(スキーマ)とリソルバを引数に取る
  const server = new ApolloServer({
    typeDefs, // スキーマ
    resolvers, // リゾルバ
    context: async ({ req, connection }) => {
      const githubToken = req
        ? req.headers.authorization // QueryやMutationの場合、HTTPを使用しているのでreqから取得
        : connection.context.authorization; // サブスクリプションを受け取った場合、コネクションのcontextを使用して認可情報の詳細を受け取る

      const currentUser = await db.collection("users").findOne({ githubToken });
      return { db, currentUser, pubsub };
    }, // コンテキスト (リクエストの度にユーザー情報をコンテキストに設定するため、関数の記述で使用)
  });

  // applyMiddleware()を呼び出し、Expressにミドルウェアを追加する
  server.applyMiddleware({ app });

  // ホームルートを作成
  app.get("/", (req, res) => res.end("Welcome to the PhotoShare API"));
  // playground用のルート
  app.get("/playground", expressPlayground({ endpoint: "/graphql" }));

  // /img/photosへのHTTPリクエストに対し、assets/photos内の静的ファイルを提供できるようにする
  app.use(
    "/img/photos",
    express.static(path.join(__dirname, "assets", "photos"))
  );

  // Apollo Serverでサブスクリプションを使用するためには、HTTPサーバーが必要
  // httpサーバーを作成
  const httpServer = createServer(app);
  // server.installSubscriptionHandlers: webSocketを動作させるためのコード
  server.installSubscriptionHandlers(httpServer);

  // 特定のポートでリッスンする
  httpServer.listen({ port: 4000 }, () => {
    console.log(
      `GraphQL Server running at http://localhost:4000${server.graphqlPath}`
    );
  });
}

// start関数を実行 (DBにアクセスする)
start();
