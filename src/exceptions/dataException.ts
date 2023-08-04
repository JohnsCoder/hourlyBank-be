import { DataIntegrityError } from "../types/exceptions/DataIntegrityError";
import { ExceptionHandler } from "./ExceptionHandler";

export default function DataIntegrityViolationException(
  err: DataIntegrityError
) {
  return new ExceptionHandler(err).throwError();
}
