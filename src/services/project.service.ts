import { Prisma } from "@prisma/client";
import tokenVerify from "../middlewares/tokenVerify";
import variablesVerify from "../middlewares/variablesVerify";
import { Project } from "../entities/Project";
import DatabaseException from "../exceptions/dbException";
import projectRepository from "../repositories/project.repository";

class ProjectService {
  private repository = projectRepository;

  async CreateProject(project: Project, token: string) {
    tokenVerify(token);
    variablesVerify(project);
    try {
      await this.repository.insert(project);
      return { message: "project sucessful created!" };
    } catch (err: any) {
      console.log(err.name);
      throw DatabaseException(err);
    }
  }

  async GetProjects({ userId }: Project, token: string) {
    tokenVerify(token);
    const projects = await this.repository.findMany(userId);
    return { data: JSON.stringify(projects) };
  }

  async CloseProject({ id, finished }: Project, token: string) {
    tokenVerify(token);
    try {
      await this.repository.update(id!, finished);
      return { message: "project sucessful closed!" };
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError)
        throw DatabaseException(err);
      console.log(err);
    }
  }

  async DeleteProject({ id }: Project, token: string) {
    tokenVerify(token);
    try {
      await this.repository.delete(id!);
      return { message: "project sucessful deleted!" };
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError)
        throw DatabaseException(err);
      console.log(err);
    }
  }
}

export default new ProjectService();
