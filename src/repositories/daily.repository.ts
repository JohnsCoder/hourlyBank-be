import { PrismaClient } from "@prisma/client";
import { Daily } from "../entities/Daily";

class DailyRepository {
  private daily = new PrismaClient().daily;

  insert(data: Daily) {
    return this.daily.create({ data });
  }

  findMany(projectId: string) {
    return this.daily.findMany({ where: { projectId } });
  }

  update(id: string, data: Daily) {
    return this.daily.update({ where: { id }, data });
  }

  delete(id: string) {
    return this.daily.delete({ where: { id } });
  }
}

export default new DailyRepository();
