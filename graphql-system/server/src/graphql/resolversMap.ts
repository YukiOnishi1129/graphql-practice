import { IResolvers } from "graphql-tools";
import { merge } from "lodash";
import { UserResolvers } from "./resolvers/UserResolver";

// リゾルバを１つに統合
const resolverMap: IResolvers = merge(UserResolvers);
export default resolverMap;
