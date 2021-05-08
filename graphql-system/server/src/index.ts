require("module-alias/register");
// require("dotenv").config();
import express from "express";
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
/* schema */
import schema from "./graphql/schemasMap";

async function start() {
  const app = express();
  const PORT = {
    port: 4000,
  };

  // app.get("/", (req, res) => {
  //   res.send("Hello, World!");
  // });

  const server = new ApolloServer({
    schema,
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
