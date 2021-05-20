require("module-alias/register");
// require("dotenv").config();
import express from "express";
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
/* schema */
import schema from "./graphql/schemasMap";

dotenv.config();

async function start() {
  const app = express();
  const PORT = 4000;

  // app.get("/", (req, res) => {
  //   res.send("Hello, World!");
  // });

  const server = new ApolloServer({
    schema,
    context: async () => ({
      jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    }),
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
