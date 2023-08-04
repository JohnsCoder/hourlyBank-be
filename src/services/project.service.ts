import { PrismaClient } from "@prisma/client";
import { Project } from "../entities/Project";
import projectRepository from "../repositories/project.repository";
import tokenVerify from "../middlewares/tokenVerify";
import variablesVerify from "../middlewares/variablesVerify";

class ProjectService {
  private repository = projectRepository;

  CreateProject(project: Project, token: string) {
    tokenVerify(token);
    variablesVerify(project);
    try {
      this.repository.insert(project);
    } catch (err) {
      console.log(err);
    }
  }

  GetProjects({ userId }: Project, token: string) {
    tokenVerify(token);
    try {
      this.repository.findMany(userId);
    } catch (err) {
      console.log(err);
    }
  }

  CloseProject({ id, finished }: Project, token: string) {
    tokenVerify(token);
    try {
      this.repository.update(id!, finished);
    } catch (err) {
      console.log(err);
    }
  }

  DeleteProject({ id }: Project, token: string) {
    tokenVerify(token);
    try {
      this.repository.delete(id!);
    } catch (err) {
      console.log(err);
    }
  }
}

export default new ProjectService();
