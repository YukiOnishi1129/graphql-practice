/**
 * schema mapping
 */
import "graphql-import-node"; // アプリケーションに「.graphql」ファイルを取り組むライブラリ
import { makeExecutableSchema } from "graphql-tools";
import { GraphQLSchema } from "graphql";
/* schemas */
import * as userTypeDefs from "./schemas/user.graphql";
import * as chatTypeDefs from "./schemas/chat.graphql";
import * as emptyTypeDefs from "./schemas/empty.graphql";
/* resolvers */
import resolvers from "./resolversMap";

/**
 * create schema
 */
const schema: GraphQLSchema = makeExecutableSchema({
  // 先にQueryとMutationの型を定義して、他の全てのスキーマファイルを拡張するためにemptyを定義
  // なので、先にemptyを記述しないとエラー
  typeDefs: [emptyTypeDefs, userTypeDefs, chatTypeDefs],
  resolvers,
});

export default schema;
