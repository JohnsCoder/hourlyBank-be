import { Prisma } from "@prisma/client";
import { Project } from "../entities/Project";
import DatabaseException from "../exceptions/dbException";
import tokenVerify from "../middlewares/tokenVerify";
import projectRepository from "../repositories/project.repository";
import variablesVerify from "../middlewares/variablesVerify";

class ProjectService {
  private repository = projectRepository;

  async CreateProject(project: Project, token: string) {
    const { id } = tokenVerify(token)!;

    try {
      await this.repository.insert({ ...project, userId: id });
      return { message: "project sucessful created!" };
    } catch (err: any) {
      console.log(err.name);
      throw DatabaseException(err);
    }
  }

  async GetProjects(token: string) {
    const { id } = tokenVerify(token)!;
    const projects = await this.repository.findMany(id);
    return { data: JSON.stringify(projects) };
  }

  async UpdateProject({ id, ...project }: Project, token: string) {
    tokenVerify(token);
    variablesVerify({ id, ...project });
    try {
      await this.repository.update(id!, project);
      return { message: "project sucessful updated!" };
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError)
        throw DatabaseException(err);
      console.log(err);
    }
  }

  async CloseProject({ id }: Project, token: string) {
    tokenVerify(token);
    variablesVerify({ id });

    try {
      await this.repository.update(id!, { finished: true } as Project);
      return { message: "project sucessful closed!" };
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError)
        throw DatabaseException(err);
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
