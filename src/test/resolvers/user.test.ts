import ProjectClient from "./project.client";
import UserClient from "./user.client";

describe("user routes", () => {
  it("register route", async () => {
    const createUser = new UserClient().CreateUser({
      username: "john",
      email: "john@email.com",
      password: "john123",
    });

    expect((await createUser).data).toEqual({
      CreateUser: {
        message: "usuario registrado com sucesso!",
        status: "Created",
        
      },
    });
  });

  it("register route - exception", async () => {
    const empty = new UserClient().CreateUser({
      username: "",
      email: "",
      password: "",
    });

    expect((await empty).data).toEqual({
      CreateUser: {  message: "campo vazio", status: "Bad Request" },
    });

    const repeated = new UserClient().CreateUser({
      username: "john",
      email: "john@email.com",
      password: "john123",
    });

    expect((await repeated).data).toEqual({
      CreateUser: {
        
        message: "email já utilizado",
        status: "Bad Request",
      },
    });
  });

  it("login route", async () => {
    const getUser = new UserClient().GetUser({
      email: "john@email.com",
      password: "john123",
    });

    delete (await getUser).data?.GetUser?.payload;
    expect((await getUser).data).toEqual({
      GetUser: {
        message: "usuario autenticado",
        status: "OK",
        
      },
    });
  });

  it("login route - exception", async () => {
    const empty = new UserClient().GetUser({
      email: "",
      password: "",
    });

    const invalid = new UserClient().GetUser({
      email: "john1asd@email.com",
      password: "john123",
    });

    const wrongPassword = new UserClient().GetUser({
      email: "john@email.com",
      password: "john1234",
    });

    expect((await empty).data).toEqual({
      GetUser: {
        
        message: "campo vazio",
        payload: null,
        status: "Bad Request",
      },
    });

    expect((await invalid).data).toEqual({
      GetUser: {
        
        message: "email invalido",
        payload: null,
        status: "Not Found",
      },
    });
    expect((await wrongPassword).data).toEqual({
      GetUser: {
        
        message: "senha incorreta",
        payload: null,
        status: "Unauthorized",
      },
    });
  });

  it("auth route", async () => {
    const token = new UserClient()
      .GetUser({
        email: "john@email.com",
        password: "john123",
      })
      .then((e) => e.data?.GetUser?.payload.tokenid);

    const authorize = new UserClient().Authorize({
      token: await token,
    });
    delete (await authorize).data?.Auth.payload;

    expect((await authorize).data).toEqual({
      Auth: {
        
        message: "usuario autenticado",
        status: "OK",
      },
    });
  });

  it("auth route - exception ", async () => {
    const unauthorized = new UserClient().Authorize({
      token: "aspfpsap",
    });

    expect((await unauthorized).data).toEqual({
      Auth: {
        
        message: "jwt malformed",
        payload: null,
        status: "Unauthorized",
      },
    });
  });

  it("delete route", async () => {
    const token = new UserClient()
      .GetUser({
        email: "john@email.com",
        password: "john123",
      })
      .then((e) => e.data?.GetUser?.payload.tokenid);

    const id = new UserClient().Authorize({
      token: await token,
    });

    const deleteUser = new UserClient().DeleteUser({
      id: (await id).data?.Auth.payload.id,
    });

    expect((await deleteUser).data).toEqual({
      DeleteUser: {  message: "projeto deletado", status: "OK" },
    });
  });
  it("delete route - exception", async () => {
    const invalidId = new UserClient().DeleteUser({
      id: "perw",
    });
    expect((await invalidId).data).toEqual({
      DeleteUser: {  message: "id invalido", status: "Not Found" },
    });
  });
});
