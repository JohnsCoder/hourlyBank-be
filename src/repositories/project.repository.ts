import { PrismaClient } from "@prisma/client";
import { Project } from "../entities/Project";

class ProjectRepository {
  private project = new PrismaClient().project;

  insert(data: Project) {
    return this.project.create({
      data,
    });
  }

  findMany(userId: string) {
    return this.project.findMany({
      where: {
        userId,
      },
    });
  }

  update(id: string, finished: boolean) {
    return this.project.update({
      where: {
        id,
      },
      data: {
        finished,
      },
    });
  }

  delete(id: string) {
    return this.project.delete({
      where: {
        id,
      },
    });
  }
}
export default new ProjectRepository;
