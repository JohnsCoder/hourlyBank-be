import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { User } from "../types/arguments";
import crypt from "../utils/crypt";
import JwToken from "../utils/jwToken";

async function Register({ username, email, password }: User) {
  

  [username, email, password] = [username, email, password].map((e) =>
    (e as string).trim()
  );
  if ([username, email, password].includes("")) {
    return {
      message: "campo vazio",
      status: "Bad Request",
      code: 400,
    };
  }
  // console.log([username, email, password]);

  return await prisma.user
    .create({
      data: {
        username: username,
        email: email,
        password: new crypt().encrypt(password),
      },
    })
    .then(
      () => (
        {
          message: "usuario registrado com sucesso!",
          status: "Created",
          code: 201,
        }
      )
    )
    .catch((err) => {
      console.log(err)
      if (err.code === "P2002") {
        return {
          message: "email já utilizado",
          status: "Bad Request",
          code: 400,
        };
      }
    });
}

async function Login({ email, password }: User) {
  [email, password] = [email, password].map((e) => (e as string).trim());

  if ([email, password].includes("")) {
    return {
      message: "campo vazio",
      status: "Bad Request",
      code: 400,
    };
  }

  return await prisma.user
    .findUnique({
      where: {
        email: email,
      },
    })
    .then((user) => {
      if (user === null) {
        return {
          message: "email invalido",
          status: "Not Found",
          code: 404,
        };
      }
      return new crypt().decrypt({
        cipher: user.password.split("-")[0],
        iv: Buffer.from(user.password.split("-")[1], "hex"),
        key: Buffer.from(user.password.split("-")[2], "hex"),
      }) === password
        ? {
            payload: {
              tokenid: JwToken.tokenSign(user.id),
            },
            message: "usuario autenticado",
            status: "OK",
            code: 200,
          }
        : {
            message: "senha incorreta",
            status: "Unauthorized",
            code: 401,
          };
    });
}

function Auth({ token }: User) {
  try {
    return {
      message: "usuario autenticado",
      payload: {
        id: JwToken.tokenVerify(token as string).id,
      },
      status: "OK",
      code: 200,
    };
  } catch (err: any) {
    return {
      message: `${err.message}`,
      status: "Unauthorized",
      code: 401,
    };
  }
}

function DeleteUser({ id }: User) {
  return prisma.user
    .delete({
      where: {
        id: id,
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
export { Register, Login, Auth, DeleteUser };
