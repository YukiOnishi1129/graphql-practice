const { ApolloServer } = require("apollo-server");
const { GraphQLScalarType } = require("graphql");

// 文字列としてスキーマ定義
/**
 * スキーマ
 */
const typeDefs = `
    scalar DateTime

    enum PhotoCategory {
      SELECT
      PORTRAIT
      ACTION
      LANDSCAPE
      GRAPHIC
    }

    type Photo {
      id: ID!
      url: String!
      name: String!
      description: String
      category: PhotoCategory!
      postedBy: User!
      taggedUsers: [User!]!
      created: DateTime!
    }

    type User {
      githubLogin: ID!
      name: String
      avatar: String
      postedPhotos: [Photo!]!
      inPhotos: [Photo!]!
    }

    input PostPhotoInput {
      name: String!
      category: PhotoCategory=PORTRAIT
      description: String
    }

    type Query {
        totalPhotos: Int!
        allPhotos(after: DateTime): [Photo!]!
    }

    type Mutation {
        postPhoto(input: PostPhotoInput!): Photo!
    }
`;

const users = [
  { githubLogin: "mHattrup", name: "Mike Hattrup" },
  { githubLogin: "gPlake", name: "Glen Plake" },
  { githubLogin: "sSchmidt", name: "Scot Schmidt" },
];

// 写真を格納するための配列を定義
const photos = [
  {
    id: "1",
    name: "Dropping the Heart Chute",
    description: "The heart chute is one of my favorite chutes",
    category: "ACTION",
    githubUser: "gPlake",
    created: "3-29-1977",
  },
  {
    id: "2",
    name: "Enjoying the sunshine",
    category: "SELECT",
    githubUser: "sSchmidt",
    created: "1-2-1985",
  },
  {
    id: "3",
    name: "Gunbarrel 25",
    description: "25 laps on gunbrrel today",
    category: "LANDSCAPE",
    githubUser: "sSchmidt",
    created: "2018-04-15T19:00:57.308Z",
  },
];

const tags = [
  { photoID: "1", userID: "gPlake" },
  { photoID: "2", userID: "sSchmidt" },
  { photoID: "2", userID: "sSchmidt" },
  { photoID: "2", userID: "gPlake" },
];

// const d = new Date("4/18/2018");
// console.log(d.toISOString());
// const serialize = (value) => new Date(value).toISOString();
const parseValue = (value) => new Date(value);

// 1. ユニークIDをインクリメントするための変数
let _id = 0;
// 写真を格納するための配列を定義
// const photos = [];

/**
 * リゾルバ
 */
const resolvers = {
  Query: {
    //  Queryを作成する場合、必ずスキーマ名と同じリソルバ関数を定義する
    totalPhotos: () => photos.length,
    allPhotos: (parent, args) => {
      return photos;
    },
  },

  // postPhotoミューテーションと対応するリゾルバ
  Mutation: {
    //   第一引数は親オブジェクトへの参照
    //   リゾルバの第２引数: {name, description}のオブジェクト
    postPhoto(parent, args) {
      // 2. 新しい写真を作成し、idを生成する
      const newPhoto = {
        id: _id++,
        ...args.input,
        created: new Date(),
      };
      photos.push(newPhoto);

      // 3. 新しい写真を返す
      return newPhoto;
    },
  },

  // トリビアルリゾルバ (ルートに追加されたリゾルバ)
  Photo: {
    url: (parent) => `http://yoursite.com/img/${parent.id}.jpg`,
    postedBy: (parent) => {
      // データの取得方法は実装者に委ねられる
      return users.find((u) => u.githubLogin === parent.githubUser);
    },

    taggedUsers: (parent) =>
      tags
        // 対象の写真が関係しているタグの配列を返す
        .filter((tag) => tag.photoID === parent.id)
        // タグの配列をユーザーIDの配列に変換する
        .map((tag) => tag.userID)
        // ユーザーIDの配列をユーザーオブジェクトの配列に変換する
        .map((userID) => users.find((u) => u.githubLogin === userID)),
  },

  User: {
    postedPhotos: (parent) => {
      return photos.filter((p) => p.githubUser === parent.githubLogin);
    },

    inPhotos: (parent) =>
      tags
        // 対象のユーザーが関係しているタグの配列を返す
        .filter((tag) => tag.photoID === parent.id)
        // タグの配列をユーザーIDの配列に変換する
        .map((tag) => tag.photoID)
        // 写真IDの配列を写真オブジェクトの配列に変換する
        .map((photoID) => users.find((p) => p.githubLogin === photoID)),
  },

  // カスタムスカラーのリゾルバを作成
  DateTime: new GraphQLScalarType({
    name: "DateTime",
    description: "A valid date time value",
    // DateTimeを処理するための3つの関数
    parseValue: (value) => new Date(value),
    serialize: (value) => new Date(value).toISOString(),
    parseLiteral: (ast) => ast.value,
  }),
};

// サーバーインスタンスを作成
// その際、typeDefs(スキーマ)とリソルバを引数に取る
const server = new ApolloServer({
  typeDefs, // スキーマ
  resolvers, // リゾルバ
});

// Webサーバー起動
server
  .listen()
  .then(({ url }) => console.log(`GraphQL Service running on ${url}`));
