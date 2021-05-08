import { IResolvers } from "graphql-tools";
import { merge } from "lodash";
import { UserResolvers } from "./resolvers/UserResolver";
import { ChatResolvers } from "./resolvers/ChatResolver";

// リゾルバを１つに統合
const resolverMap: IResolvers = merge(UserResolvers, ChatResolvers);
export default resolverMap;
