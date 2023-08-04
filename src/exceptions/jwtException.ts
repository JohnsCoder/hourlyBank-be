import { Prisma } from "@prisma/client";
import { JwtVerifyErrors } from "../types/exceptions/JwtVerifyErrors";
import ExceptionHandler from "./ExceptionHandler";
import Jwt from "jsonwebtoken";

export default function JwtException(err: Jwt.JsonWebTokenError) {
  return ExceptionHandler({ message: err.message, httpCode: "401" });
}
