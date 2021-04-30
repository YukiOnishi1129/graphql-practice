module.exports = {
  totalPhotos: (parent, args, { db }) =>
    db.collection("photos").estimatedDocumentCount(),

  // estimatedDocumentCount(): コレクション内のカウントを取得

  allPhotos: (parent, args, { db }) => db.collection("photos").find().toArray(),
  // find().toArray(): 配列に変換

  totalUsers: (parent, args, { db }) =>
    db.collection("users").estimatedDocumentCount(),

  allUsers: (parent, args, { db }) => db.collection("users").find().toArray(),
};
