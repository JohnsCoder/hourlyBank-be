import dailyService from "../services/daily.service";
import projectService from "../services/project.service";
import { Params } from "../types/arguments";

const service = dailyService;
export default {
  Query: {
     GetDailies(...[, valur, contextValue]: Params) {
      return service.GetDailies(valur, contextValue.token);
    },
  },

  Mutation: {
    CreateDaily(...[, value, contextValue]: Params) {
      return service.CreateDaily(value, contextValue.token);
    },
    UpdateDaily(...[, value, contextValue]: Params) {
      return service.UpdateDaily(value, contextValue.token);
    },
    DeleteDaily(...[, value, contextValue]: Params) {
      return service.DeleteDaily(value, contextValue.token);
    },
  },
};
