import { Prisma } from "@prisma/client";
import { User } from "../entities/User";
import DatabaseException from "../exceptions/dbException";
import ResourceNotFoundException from "../exceptions/notFoundException";
import tokenVerify from "../middlewares/tokenVerify";
import variablesVerify from "../middlewares/variablesVerify";
import userRepository from "../repositories/user.repository";
import crypt from "../utils/crypt";
import { default as jwToken } from "../utils/jwToken";

class UserService {
  private repository = userRepository;

  async Register(user: User) {
    variablesVerify(user);
    try {
      await this.repository.insert({
        ...user,
        password: crypt.encrypt(user.password),
      });
      return { message: "user sucessful created!" };
    } catch (err: any) {
      if (err instanceof Prisma.PrismaClientKnownRequestError)
        DatabaseException(err);
    }
  }

  async Login(user: User) {
    variablesVerify(user);
    const entries = await this.repository.findByEmail(user.email);
    if (!entries) ResourceNotFoundException();
    if (crypt.decrypt(entries!.password) !== user.password)
      ResourceNotFoundException();

    return {
      message: "user sucessful created!",
      data: jwToken.Sign(entries!.id),
    };
  }

  AuthUser(token: string) {
    tokenVerify(token);
    return {
      message: "Authorized!",
    };
  }
}
export default new UserService();
