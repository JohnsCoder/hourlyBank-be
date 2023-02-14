import {
  CreateProject,
  DeleteProject,
  GetProject,
  UpdateProject,
} from "./resolvers/project.resolver";
import { Auth, Login, Register } from "./resolvers/user.resolver";
import { Payload } from "./types/arguments";

const resolvers = {
  Query: {
    async GetUser(...[, payload]: Payload) {
      return await Login({
        email: payload.email,
        password: payload.password,
      });
    },
    Auth(...[, payload]: Payload) {
      return Auth({
        token: payload.token,
      });
    },
    GetProject(...[, project]: Payload) {
      return GetProject();
    },
  },

  Mutation: {
    async CreateUser(...[, user]: Payload) {
      return await Register(user);
    },
    CreateProject(...[, project]: Payload) {
      return CreateProject(project);
    },
    UpdateProject(...[, project]: Payload) {
      UpdateProject(project);
    },

    DeleteProject(...[, project]: Payload) {
      DeleteProject (project)
    }
  },
};
export default resolvers;
