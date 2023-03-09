import { ApolloServer } from "apollo-server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import resolvers from "./src/resolvers";
import typeDefs from "./src/schemas";
(async function main() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.listen(process.env.PORT || 8000, () =>
    console.log("Server Running!")
  );
})();
