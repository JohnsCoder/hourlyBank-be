import { Prisma } from "@prisma/client";
import { Daily } from "../entities/Daily";
import DatabaseException from "../exceptions/dbException";
import tokenVerify from "../middlewares/tokenVerify";
import dailyRepository from "../repositories/daily.repository";

class DailyService {
  private repository = dailyRepository;

  async CreateDaily(daily: Daily, token: string) {
    tokenVerify(token)!;

    try {
      await this.repository.insert(daily);
      return { message: "daily sucessful created!" };
    } catch (err: any) {
      console.log(err.name);
      throw DatabaseException(err);
    }
  }

  async GetDailies({ projectId }: Daily, token: string) {
    tokenVerify(token)!;
    const projects = await this.repository.findMany(projectId);
    return { data: JSON.stringify(projects) };
  }

  async UpdateDaily({ id, ...daily }: Daily, token: string) {
    tokenVerify(token);
    try {
      await this.repository.update(id!, daily);
      return { message: "daily sucessful updated!" };
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError)
        throw DatabaseException(err);
      console.log(err);
    }
  }

  async DeleteDaily({ id }: Daily, token: string) {
    tokenVerify(token);
    try {
      await this.repository.delete(id!);
      return { message: "daily sucessful deleted!" };
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError)
        throw DatabaseException(err);
      console.log(err);
    }
  }
}

export default new DailyService();
