import React from "react";
import { render } from "react-dom";
import App from "./App";
import { ApolloProvider } from "react-apollo";
import ApolloClient, { InMemoryCache } from "apollo-boost";
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

// GraphQLサービスへのネットワーク接続を全て管理するインスタンスを作成
const client = new ApolloClient({
  cache,
  uri: "http://localhost:4000/graphql",
  // Apollo Clientのrequestを追加
  // 全てのoperationがGraphQLサービスに送信される前にその内容を受け取る
  // 送信前にローカルストレージにあるgithub tokenをheadersに格納する
  request: (operation) => {
    operation.setContext((context) => ({
      headers: {
        ...context.headers,
        authorization: localStorage.getItem("token"),
      },
    }));
  },
});

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
