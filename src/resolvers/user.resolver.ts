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
    };
  }

  return await prisma.user
    .create({
      data: {
        username: username,
        email: email,
        password: new crypt().encrypt(password),
      },
    })
    .then(() => ({
      message: "usuario registrado com sucesso!",
      status: "Created",
    }))
    .catch((err) => {
      console.log("alou");
      console.log(err);
      if (err.code === "P2002") {
        return {
          message: "email já utilizado",
          status: "Bad Request",
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
          }
        : {
            message: "senha incorreta",
            status: "Unauthorized",
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
    };
  } catch (err: any) {
    return {
      message: `${err.message}`,
      status: "Unauthorized",
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
    }))
    .catch(() => ({
      message: "id invalido",
      status: "Not Found",
    }));
}
export { Register, Login, Auth, DeleteUser };
