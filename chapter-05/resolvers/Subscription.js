module.exports = {
  newPhoto: {
    subscribe: (parent, args, { pubsub }) =>
      //   asyncIterator: photo-addが投げられる度に、新しい写真サブスクリプションに渡される
      pubsub.asyncIterator("photo-added"),
  },
  //   newUser: {
  //     subscribe: (parent, args, { pubsub }) => pubsub.asyncIterator("user-added"),
  //   },
};
