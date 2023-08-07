import projectService from "../services/project.service";
import { Params } from "../types/arguments";

const service = projectService;
export default {
  Query: {
    GetProjects(...[, , contextValue]: Params) {
      return service.GetProjects(contextValue.token);
    },
  },

  Mutation: {
    CreateProject(...[, value, contextValue]: Params) {
      return service.CreateProject(value, contextValue.token);
    },
    UpdateProject(...[, value, contextValue]: Params) {
      return service.UpdateProject(value, contextValue.token);
    },
    CloseProject(...[, value, contextValue]: Params) {
      return service.CloseProject(value, contextValue.token);
    },
    DeleteProject(...[, value, contextValue]: Params) {
      return service.DeleteProject(value, contextValue.token);
    },
  },
};
