import { PrismaClient } from "@prisma/client";
import { Project } from "../types/arguments";
import JwToken from "../utils/jwToken";

const prisma = new PrismaClient();

function CreateProject(project: Project) {
  return prisma.project
    .create({
      data: {
        userId: JwToken.id.id as string,
        title: project.title as string,
        dateStart: new Date(),
        dateFinish: new Date(),
        price: project.price as number,
        description: project.description as string,
        finished: project.finished as boolean,
        daily: [],
      },
    })
    .then((e) => console.log(e));
}

function GetProject() {
  const projects = prisma.project
    .findMany({
      where: {
        userId: JwToken.id.id as string,
      },
    })
    .then((e) => console.log(e.map((e) => e)));

  return {
    message: "usuario autenticado",
    status: "OK",
    code: 200,
  };
}

function UpdateProject(project: Project) {
  console.log(project.daily);
  return prisma.project
    .update({
      where: {
        id: project.id,
      },
      data: {
        daily: [project.daily as object],
      },
    })
    .then((e) => console.log(e));
}

function DeleteProject(project: Project) {
  return prisma.project
    .delete({
      where: {
        id: project.id,
      },
    })
    .then((e) => console.log(e));
}

export { CreateProject, GetProject, UpdateProject, DeleteProject };
