import { PrismaClient } from "@prisma/client";
import { Project } from "../entities/Project";
import projectRepository from "../repositories/project.repository";
import { Daily } from "../types/arguments";

class ProjectService {
  private repository = projectRepository;

  CreateProject(project: Project) {
    try {
      this.repository.insert(project);
    } catch (err) {
      console.log(err);
    }
  }

  GetProjects(userId: string) {
    try {
      this.repository.findMany(userId);
    } catch (err) {
      console.log(err);
    }
  }

  UpdateProject(id: string, finished: boolean) {
    try {
      this.repository.update(id, finished);
    } catch (err) {
      console.log(err);
    }
  }

  DeleteProject(id: string) {
    try {
      this.repository.delete(id);
    } catch (err) {
      console.log(err);
    }
  }
}

export default new ProjectService();

const prisma = new PrismaClient();

function CreateProject(project: Project) {
  [
    project.title,
    project.dateStart,
    project.dateFinish,
    project.currency,
    project.description,
  ] = [
    project.title,
    project.dateStart,
    project.dateFinish,
    project.currency,
    project.description,
  ].map((e) => (e as string).trim());

  if (
    [
      project.title,
      project.dateStart,
      project.dateFinish,
      project.description,
    ].includes("")
  ) {
    return {
      message: "campo vazio",
      status: "Bad Request",
    };
  }

  return prisma.project
    .create({
      data: {
        userId: project.userId as string,
        title: project.title as string,
        dateStart: new Date(project.dateStart),
        dateFinish: new Date(project.dateFinish),
        currency: project.currency as string,
        price: project.price as number,
        description: project.description as string,
        finished: false,
        daily: [],
      },
    })
    .then(() => ({
      message: "projeto criado com sucesso!",
      status: "Created",
    }));
}

async function GetProjects(project: Project) {
  return await prisma.project
    .findMany({
      where: {
        userId: project.userId,
      },
    })
    .then((project) => ({
      __typename: "Projects",
      projects: project,
    }))
    .catch(() => ({
      __typename: "Message",
      message: "id invalido",
      status: "Not Found",
    }));
}

function UpdateProject(daily: Daily) {
  return prisma.project
    .findUnique({
      where: {
        id: daily.id,
      },
      select: {
        daily: true,
      },
    })
    .then((project) => {
      if (
        typeof (project as { daily: Daily[] }).daily === "object" &&
        Array.isArray((project as { daily: Daily[] }).daily)
      ) {
        return prisma.project
          .update({
            where: {
              id: daily.id,
            },
            data: {
              daily:
                (project as { daily: Daily[] }).daily.length === 0
                  ? [{ hour: daily.hour, todo: daily.todo }]
                  : [
                      ...(project as { daily: Daily[] }).daily,
                      { hour: daily.hour, todo: daily.todo },
                    ],
            },
          })
          .then(() => ({
            message: "projeto atualizado com sucesso!",
            status: "Created",
          }));
      }
    })
    .catch(() => ({
      message: "id invalido",
      status: "Not Found",
    }));
}

function FinishProject(project: Project) {
  return prisma.project
    .update({
      where: {
        id: project.id,
      },
      data: {
        finished: true,
      },
    })
    .then(() => ({
      message: "projeto atualizado com sucesso!",
      status: "Created",
    }));
}

function DeleteProject(project: Project) {
  return prisma.project
    .delete({
      where: {
        id: project.id,
      },
    })
    .then(() => ({
      message: "projeto deletado",
      status: "OK",
    }))
    .catch(() => ({
      message: "id invalido",
      status: "Not Found",
    }));
}

// export {
//   CreateProject,
//   DeleteProject,
//   FinishProject,
//   GetProjects,
//   UpdateProject,
// };
