import { Prisma, PrismaClient } from "@prisma/client";
import { Daily, Project } from "../types/arguments";

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
      code: 400,
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
      code: 201,
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
      code: 404,
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
            code: 201,
          }));
      }
    })
    .catch(() => ({
      message: "id invalido",
      status: "Not Found",
      code: 404,
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
      code: 201,
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
      code: 200,
    }))
    .catch(() => ({
      message: "id invalido",
      status: "Not Found",
      code: 404,
    }));
}

export {
  CreateProject,
  GetProjects,
  UpdateProject,
  FinishProject,
  DeleteProject,
};
