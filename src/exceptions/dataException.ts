import { DataIntegrityError } from "../types/exceptions/DataIntegrityError";
import ExceptionHandler from "./ExceptionHandler";

export default function DataIntegrityViolationException() {
  const err = new DataIntegrityError("Empty Values");
  return ExceptionHandler({ message: err.message, httpCode: "400" });
}
