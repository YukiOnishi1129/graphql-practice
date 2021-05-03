import React from "react";
import { render } from "react-dom";
import App from "./App";
import { ApolloProvider } from "react-apollo";
import {
  InMemoryCache,
  HttpLink,
  ApolloLink, // Apollo Clientのネットワークリクエストを管理
  ApolloClient,
  split, // GraphQLオペレーションをHTTPリクエストかとWebSocketに分割するために使用
  // Query, Mutation → HTTPリクエストを送信
  // Subscription ¬ WebSocketで接続
} from "apollo-boost";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { persistCache } from "apollo-cache-persist";

// cacheオブジェクト作成
const cache = new InMemoryCache();
persistCache({
  cache,
  storage: localStorage, // キャッシュをブラウザのローカルストレージに保存
});

// 起動時にキャッシュデータがあれば初期化
if (localStorage["apollo-cache-persist"]) {
  let cacheData = JSON.parse(localStorage["apollo-cache-persist"]);
  // cacheインスタンスに追加
  cache.restore(cacheData);
}

// HTTPリクエストを送信するために使用
const httpLink = new HttpLink({ uri: "http://localhost:4000/graphql" });

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext((context) => ({
    headers: {
      ...context.headers,
      authorization: localStorage.getItem("token"),
    },
  }));
  return forward(operation);
});

// concat: jsのものとは違う
// リンクを結合する特殊な関数
// authLinkでヘッダーに認証キーをセットした後に、http linkでHTTPリクエストを送信する
const httpAuthLink = authLink.concat(httpLink);

// コネクションを使用して、WebSocket経由でデータを受け取るために使用
const wsLink = new WebSocketLink({
  uri: "ws://localhost:4000/graphql",
  options: { reconnect: true },
});

// split: 2つのApollo Linkのうち、1つを返す
// 第一引数：trueまたはfalseを返す関数
// 第２引数：第一引数がtrueの場合のリンク
// 第3引数：第一引数がfalseの場合のリンク
const link = split(
  ({ query }) => {
    // operationのquery ASTを確認
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpAuthLink
);

// GraphQLサービスへのネットワーク接続を全て管理するインスタンスを作成
const client = new ApolloClient({
  cache,
  link,
});
// const client = new ApolloClient({
//   cache,
//   uri: "http://localhost:4000/graphql",
//   // Apollo Clientのrequestを追加
//   // 全てのoperationがGraphQLサービスに送信される前にその内容を受け取る
//   // 送信前にローカルストレージにあるgithub tokenをheadersに格納する
//   request: (operation) => {
//     operation.setContext((context) => ({
//       headers: {
//         ...context.headers,
//         authorization: localStorage.getItem("token"),
//       },
//     }));
//   },
// });

//gql: クエリをパースして、抽象構文木(AST)を構築する
// const query = gql`
//   {
//     totalUsers
//     totalPhotos
//   }
// `;

// ASTをクライアントに送ることができる
// client.query({ query })：クエリをHTTPリクエストとしてGraphQLサービスに送信し、レスポンスをプロミスの形へラップして返却する
// レスポンスをローカルのメモリにキャッシュする
// client.extract(): キャッシュを確認する
// client
//   .query({ query })
//   .then(({ data }) => console.log("data", data))
//   .catch(console.error);

// console.log("cache", client.extract());
// client
//   .query({ query })
//   .then(() => console.log("cache", client.extract()))
//   .catch(console.error);

render(
  // clientをグローバルスコープに設定
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
