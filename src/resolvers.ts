import {
  CreateProject,
  DeleteProject,
  FinishProject,
  GetProjects,
  UpdateProject,
} from "./resolvers/project.resolver";
import { Auth, DeleteUser, Login, Register } from "./resolvers/user.resolver";
import { Payload } from "./types/arguments";

const resolvers = {
  Query: {
    GetUser(...[, payload]: Payload) {
      return Login(payload);
    },
    Auth(...[, id]: Payload) {
      return Auth(id);
    },
    async GetProjects(...[, projects]: Payload) {
      return await GetProjects(projects);
    },

    CheckHealth() {
      return {
        message: "server running well!",
        status: "OK",
      };
    },
  },

  Mutation: {
    CreateUser(...[, user]: Payload) {
      return Register(user);
    },
    CreateProject(...[, project]: Payload) {
      return CreateProject(project);
    },
    UpdateProject(...[, daily]: Payload) {
      return UpdateProject(daily);
    },
    FinishProject(...[, project]: Payload) {
      return FinishProject(project);
    },

    DeleteProject(...[, project]: Payload) {
      return DeleteProject(project);
    },
    DeleteUser(...[, user]: Payload) {
      return DeleteUser(user);
    },
  },
};
export default resolvers;
