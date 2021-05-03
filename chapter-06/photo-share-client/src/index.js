import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ApolloProvider } from "react-apollo";
import ApolloClient, { gql } from "apollo-boost";
import { render } from "@testing-library/react";

// GraphQLサービスへのネットワーク接続を全て管理するインスタンスを作成
const client = new ApolloClient({
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
