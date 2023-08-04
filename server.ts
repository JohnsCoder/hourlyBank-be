import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { mergeResolvers } from "@graphql-tools/merge";
import projectResolver from "./src/resolvers/project.resolver";
import userResolver from "./src/resolvers/user.resolver";
import projectSchema from "./src/typeDefs/project.schema";
import userSchema from "./src/typeDefs/user.schema";
import { MyContext } from "./src/types/context";

(async function main() {
  const server = new ApolloServer<MyContext>({
    typeDefs: [userSchema, projectSchema],
    resolvers: mergeResolvers<any, MyContext>([userResolver, projectResolver]),
  });

  await startStandaloneServer(server, {
    context: async ({ req, res }) => {
      return { token: req.headers.authorization! };
    },
    listen: { port: 8000 },
  });
  console.log("🚀  Server ready at localhost:8000 ");
})();
