import Prisma, { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { scrypt, randomFill, createCipheriv } from "node:crypto";
import crypt from "../utils/crypt";
import token from "../utils/token";
type User = {
  username?: string;
  email: string;
  password: string;
};

const algorithm = "aes-192-cbc";
const password = "Password used to generate key";

async function Register({ username, email, password }: User) {
  return await prisma.user
    .create({
      data: {
        username: username,
        email: email,
        password: new crypt().encrypt(password),
      },
    })
    .then((user) => {
      [username, email, password].map((e) => {
        if (e === "") {
          return {
            __typename: "message",
            message: "campo vazio",
            status: "Bad Request",
            code: 400,
          };
        }
      });
      return {
        __typename: "message",
        message: "usuario registrado com sucesso!",
        status: "Created",
        code: 201,
      };
    })
    .catch((err) => {
      if (err.code === "P2002") {
        return {
          __typename: "message",
          message: "email já utilizado",
          status: "Bad Request",
          code: 400,
        };
      }
    });
}

async function Login({ email, password }: User) {
  return await prisma.user
    .findUnique({
      where: {
        email: email,
      },
    })
    .then((user) => {
      if ([user, password].map((e) => e === "")) {
        return {
          __typename: "message",
          message: "campo vazio",
          status: "Bad Request",
          code: 400,
        };
      }
      if (user === null) {
        return {
          __typename: "message",
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
            __typename: "message",
            payload: {
              tokenid: token(user.id),
            },
            message: "usuario autenticado",
            status: "OK",
            code: 200,
          }
        : {
            __typename: "message",
            message: "senha incorreta",
            status: "Unauthorized",
            code: 401,
          };
    });
}
export { Register, Login };
