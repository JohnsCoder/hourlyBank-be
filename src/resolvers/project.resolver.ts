import { Prisma, PrismaClient } from "@prisma/client";
import { Daily, Project } from "../types/arguments";
import JwToken from "../utils/jwToken";

const prisma = new PrismaClient();

function CreateProject(project: Project) {
  [project.title, project.dateStart, project.dateFinish, project.description] =
    [
      project.title,
      project.dateStart,
      project.dateFinish,
      project.description,
    ].map((e) => e.trim());

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
        userId: project.userId,
        title: project.title,
        dateStart: new Date(),
        dateFinish: new Date(),
        price: project.price,
        description: project.description,
        finished: project.finished,
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

async function UpdateProject(daily: Daily) {
  return await prisma.project
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
        project?.daily &&
        typeof project?.daily === "object" &&
        Array.isArray(project.daily)
      ) {
        return prisma.project
          .update({
            where: {
              id: daily.id,
            },
            data: {
              daily:
                project.daily.length === 0
                  ? [{ hour: daily.hour, day: daily.day, todo: daily.todo }]
                  : [
                      ...project.daily,
                      {
                        hour: daily.hour,
                        day:
                          ((
                            project.daily[
                              project.daily.length - 1
                            ] as Prisma.JsonObject
                          ).day as number) + 1,

                        todo: daily.todo,
                      },
                    ],
            },
          })
          .then(() => ({
            message: "projto atualizado com sucesso!",
            status: "Created",
            code: 201,
          }));
      }
    })
    .catch(
      () => (
        console.log("oi"),
        {
          message: "id invalido",
          status: "Not Found",
          code: 404,
        }
      )
    );
}

function DeleteProject(project: Project) {
  return prisma.project
    .delete({
      where: {
        id: project.id,
      },
    })
    .then((e) => ({
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

export { CreateProject, GetProjects, UpdateProject, DeleteProject };
