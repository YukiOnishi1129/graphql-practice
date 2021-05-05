const Query = require("./Query");
const Mutation = require("./Mutation");
const Subscription = require("./Subscription");
const Type = require("./Type");

const resolvers = {
  Query,
  Mutation,
  Subscription, //SubscriptionリゾルバはQueryとMutationのすぐ後に追加する必要あり
  ...Type,
};

module.exports = resolvers;
