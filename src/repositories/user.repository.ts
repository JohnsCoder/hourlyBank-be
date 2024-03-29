import { PrismaClient } from "@prisma/client";
import { User } from "../entities/User";

class UserRepository {
  private user = new PrismaClient().user;

  insert(data: User) {
    return this.user.create({ data });
  }

  findByEmail(email: string) {
    return this.user.findUnique({
      where: { email },
      select: { id: true, password: true },
    });
  }

  findById(id: string) {
    return this.user.findFirstOrThrow({ where: { id } });
  }

  delete(id: string) {
    return this.user.delete({ where: { id } });
  }
}

export default new UserRepository();
