// import { Prisma } from "@prisma/client";
// import { GraphQLError } from "graphql";

import { GraphQLError } from "graphql";
import { STATUS_CODES } from "http";
// import DataIntegrityViolationException from "./dataException";
// import ResourceNotFoundException from "./notFoundException";
// import { JwtVerifyErrors } from "../types/exceptions/JwtVerifyErrors";
// import { DataIntegrityError } from "../types/exceptions/DataIntegrityError";
// import { ResourceNotFoundError } from "../types/exceptions/ResourceNotFoundError";
// type ErrorList =
//   | Prisma.PrismaClientKnownRequestError
//   | DataIntegrityError
//   | ResourceNotFoundError;

// export class ExceptionHandler {
//   private error;
//   private ErrorTemplate(message: string, code: number) {
//     return {
//       message,
//       httpStatus: STATUS_CODES[code]!,
//       code,
//     };
//   }

//   constructor(err: ErrorList) {
//     this.error = err;
//   }

//   public throwError() {
//     let errorTemplate: { message: string; httpStatus: string; code: number };
//     if (this.error instanceof Prisma.PrismaClientKnownRequestError) {
//       errorTemplate = this.ErrorTemplate("Invalid email!", 400);
//     }
//     if (this.error instanceof JwtVerifyErrors.JsonWebTokenError)
//       errorTemplate = this.ErrorTemplate(this.error.message, 400);

//     if (this.error instanceof DataIntegrityError)
//       errorTemplate = this.ErrorTemplate(this.error.message, 400);

//     if (this.error instanceof ResourceNotFoundError) {
//       errorTemplate = this.ErrorTemplate(this.error.message, 400);
//     }
//     throw new GraphQLError(errorTemplate!.message, {
//       extensions: {
//         status: errorTemplate!.httpStatus,
//         code: errorTemplate!.code,

//       },
//     });
//   }
// }
interface StandardError {
  message: string;
  httpCode: string;
}
export default function ExecptionHandler({ message, httpCode }: StandardError) {
  throw new GraphQLError(message, {
    extensions: {
      code: STATUS_CODES[httpCode],
      http: { status: parseInt(httpCode) },
    },
  });
}
