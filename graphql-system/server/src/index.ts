require("module-alias/register");
import express from "express";
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
/* schema */
import schema from "./graphql/schemasMap";
/* services */
import { authTokenUser } from "@Services/User";

dotenv.config();

async function start() {
  const app = express();
  const PORT = 4000;

  // app.get("/", (req, res) => {
  //   res.send("Hello, World!");
  // });

  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      // playgroundで実施する場合、HTTP HEADERSに以下を投入する
      // {"authorization": tokenの値 }

      // header情報にtokenを入れておき、そのtokenからuser情報を取得し、リゾルバに渡す (リゾルバ実行前に実施される)
      const token = req ? req.headers.authorization : "";
      const currentUser = await authTokenUser(token ? token : "");

      return { currentUser };
    },
  });

  server.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(
      `\n🚀    GraphQL is now running on http://localhost:${PORT}/graphql`
    );
  });
}

start();

// export default app;
