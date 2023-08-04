import userService from "../services/user.service";
import { Params } from "../types/arguments";
const service = userService;

export default {
  Query: {
    GetUser(...[, value]: Params) {
      return service.Login(value);
    },
    Auth(...[, , contextValue]: Params) {
      return service.AuthUser(contextValue.token);
    },
  },

  Mutation: {
    CreateUser(...[, value]: Params) {
      return service.Register(value);
    },
  },
};
