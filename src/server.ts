import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { mergeResolvers } from "@graphql-tools/merge";
import projectResolver from "./resolvers/project.resolver";
import userResolver from "./resolvers/user.resolver";
import projectSchema from "./typeDefs/project.schema";
import userSchema from "./typeDefs/user.schema";
import { MyContext } from "./types/context";
import dailySchema from "./typeDefs/daily.schema";
import dailyResolver from "./resolvers/daily.resolver";

(async function main() {
  const server = new ApolloServer<MyContext>({
    typeDefs: [userSchema, projectSchema, dailySchema],
    resolvers: mergeResolvers<any, MyContext>([
      userResolver,
      projectResolver,
      dailyResolver,
    ]),
    introspection: !!process.env.GRAPHQL_INTROSPECTION,
  });

  await startStandaloneServer(server, {
    context: async ({ req }) => {
      return { token: req.headers.authorization! };
    },
    listen: { port: parseInt(process.env.PORT!) || 8000 },
  });
  console.log("🚀  Server running! ");
})();
