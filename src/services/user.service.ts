import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// import { User } from "../types/arguments";
import crypt from "../utils/crypt";
import JwToken from "../utils/jwToken";
import userRepository from "../repositories/user.repository";
import { User } from "../entities/User";
import jwToken from "../utils/jwToken";

class UserService {
  private repository = userRepository;

  Register(user: User) {
    try {
      this.repository.insert(user);
    } catch (err) {
      console.log(err);
    }
  }

  Login(user: User) {
    try {
      this.repository.findByEmail(user.email);
    } catch (err) {
      console.log(err);
    }
  }

  Authenticate(token: string) {
    try {
      const { id } = jwToken.Verify(token);
      this.repository.findById(id);
    } catch (err) {
      console.log(err);
    }
  }
}
export default new UserService();

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
              tokenid: JwToken.Sign(user.id),
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

function Auth(token: string) {
  try {
    return {  
      message: "usuario autenticado",
      payload: {
        id: JwToken.Verify(token as string).id,
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
// export { Register, Login, Auth, DeleteUser };
