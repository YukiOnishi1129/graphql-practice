const { ApolloServer } = require("apollo-server");

// 文字列としてスキーマ定義
/**
 * スキーマ
 */
const typeDefs = `
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
    }

    type User {
      githubLogin: ID!
      name: String
      avatar: String
      postedPhotos: [Photo!]!
    }

    input PostPhotoInput {
      name: String!
      category: PhotoCategory=PORTRAIT
      description: String
    }

    type Query {
        totalPhotos: Int!
        allPhotos: [Photo!]!
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
  },
  {
    id: "2",
    name: "Enjoying the sunshine",
    category: "SELECT",
    githubUser: "sSchmidt",
  },
  {
    id: "3",
    name: "Gunbarrel 25",
    description: "25 laps on gunbrrel today",
    category: "LANDSCAPE",
    githubUser: "sSchmidt",
  },
];

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
    allPhotos: () => photos,
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
  },

  User: {
    postedPhotos: (parent) => {
      return photos.filter((p) => p.githubUser === parent.githubLogin);
    },
  },
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
