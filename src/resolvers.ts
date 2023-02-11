import { Login, Register } from "./resolvers/user.resolver";
import { Arguments } from "./types/arguments";

const resolvers = {
  Query: {
    async GetUser(...[, payload]: Arguments) {
      return await Login({
        email: payload.email,
        password: payload.password,
      });
    },
  },

  Mutation: {
    async UserCreate(...[, payload]: Arguments) {
      return await Register({
        username: payload.username,
        email: payload.email,
        password: payload.password,
      });
    },
  },
};
export default resolvers;
