import { ApolloServer } from "apollo-server";
import resolvers from "./src/resolvers";
import typeDefs from "./src/schemas";
import Jwt from "jsonwebtoken";
import fs from "fs"
(async function main() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });



  await server.listen(8000, () => console.log("Server Running!"));
})();