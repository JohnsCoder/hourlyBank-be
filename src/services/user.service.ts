import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// import { User } from "../types/arguments";
import crypt from "../utils/crypt";
import JwToken from "../utils/jwToken";
import userRepository from "../repositories/user.repository";
import { User } from "../entities/User";
import jwToken from "../utils/jwToken";
import tokenVerify from "../middlewares/tokenVerify";

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

  AuthUser(token: string) {
    tokenVerify(token);
    return {
      message: "Authorized!",
    };
  }
}
export default new UserService();
