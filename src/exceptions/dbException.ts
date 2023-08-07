import { Prisma } from "@prisma/client";
import ExceptionHandler from "./ExceptionHandler";
import ExecptionHandler from "./ExceptionHandler";

export default function DatabaseException(
  err: Prisma.PrismaClientKnownRequestError
) {
  switch (err.code) {
    case "P2023":
      ExecptionHandler({ message: "Malformed ObjectID", httpCode: "400" });
      break;
    case "P2025":
      ExecptionHandler({ message: "Could't find any value!", httpCode: "404" });

    default:
      console.log(err.message);
  }
}
