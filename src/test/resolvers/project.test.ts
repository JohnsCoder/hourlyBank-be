import ProjectClient from "./project.client";

describe("project routes", () => {
  it("create project", async () => {
    const createProject = new ProjectClient().CreateProject({
      userId: "63ef95dda04f5f53281b07d6",
      title: "DatabasePeople",
      dateStart: "2023-02-13",
      dateFinish: "2023-02-13",
      currency: "R$",
      price: 12,
      description: "Projeto criado com objetivo de uma implemetação de CRUD",
    });

    expect((await createProject).data).toEqual({
      CreateProject: {
        
        message: "projeto criado com sucesso!",
        status: "Created",
      },
    });
  });

  it("create project - exeption", async () => {
    const createProject = new ProjectClient().CreateProject({
      userId: "",
      title: "",
      dateStart: "",
      dateFinish: "",
      currency: "",
      price: 12,
      description: "",
    });

    expect((await createProject).data).toEqual({
      CreateProject: {
        
        message: "campo vazio",
        status: "Bad Request",
      },
    });
  });

  it("get projects", async () => {
    const GetProjects = new ProjectClient()
      .GetProjects({
        userId: "63ef95dda04f5f53281b07d6",
      })
      .then((e) => e.data?.GetProjects.projects[0]);

    delete (await GetProjects).dateStart;
    delete (await GetProjects).dateFinish;
    delete (await GetProjects).id;

    expect(await GetProjects).toEqual({
      daily: [],

      description: "Projeto criado com objetivo de uma implemetação de CRUD",
      finished: false,
      price: 12,
      title: "DatabasePeople",
    });
  });

  it("get projects - exception", async () => {
    const GetProjects = new ProjectClient().GetProjects({
      userId: "apasjfpoapos",
    });

    expect(await (await GetProjects).data).toEqual({
      GetProjects: {
        __typename: "Message",
        
        message: "id invalido",
        status: "Not Found",
      },
    });
  });

  it("update project", async () => {
    const id = (
      await new ProjectClient().GetProjects({
        userId: "63ef95dda04f5f53281b07d6",
      })
    ).data?.GetProjects.projects[0].id;

    const updateProjects = new ProjectClient().UpdateProject({
      id: id,
      hour: 8,
      todo: "anything",
    });

    expect((await updateProjects).data).toEqual({
      UpdateProject: {
        
        message: "projeto atualizado com sucesso!",
        status: "Created",
      },
    });
  });
  
  it("update project", async () => {
    const id = (
      await new ProjectClient().GetProjects({
        userId: "63ef95dda04f5f53281b07d6",
      })
    ).data?.GetProjects.projects[0].id;

    const updateProjects = new ProjectClient().UpdateProject({
      id: id,
      hour: 8,
      todo: "anything",
    });

    expect((await updateProjects).data).toEqual({
      UpdateProject: {
        
        message: "projeto atualizado com sucesso!",
        status: "Created",
      },
    });
  });

  it("update project - exception", async () => {
    const updateProjects = new ProjectClient().UpdateProject({
      id: "siaogjdl",
      hour: 8,
      todo: "anything",
    });

    expect((await updateProjects).data).toEqual({
      UpdateProject: {  message: "id invalido", status: "Not Found" },
    });
  });

  it("finish project", async () => {
    const id = (
      await new ProjectClient().GetProjects({
        userId: "63ef95dda04f5f53281b07d6",
      })
    ).data?.GetProjects.projects[0].id;

    const finishProjects = new ProjectClient().FinishProject({
      id: id,
    });

    expect((await finishProjects).data).toEqual({
      FinishProject: {
        
        message: "projeto atualizado com sucesso!",
        status: "Created",
      },
    });
  });

  it("delete project", async () => {
    const id = new ProjectClient().GetProjects({
      userId: "63ef95dda04f5f53281b07d6",
    });

    const deleteProject = new ProjectClient().DeleteProject({
      id: (await id).data?.GetProjects.projects[0].id,
    });

    expect((await deleteProject).data).toEqual({
      DeleteProject: {  message: "projeto deletado", status: "OK" },
    });
  });

  it("delete project", async () => {
    const deleteProject = new ProjectClient().DeleteProject({
      id: "asfai0jg0",
    });

    expect((await deleteProject).data).toEqual({
      DeleteProject: {  message: "id invalido", status: "Not Found" },
    });
  });
});
