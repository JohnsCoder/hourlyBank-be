import { ResourceNotFoundError } from "../types/exceptions/ResourceNotFoundError";
import ExceptionHandler from "./ExceptionHandler";

export default function ResourceNotFoundException() {
  const err = new ResourceNotFoundError(
    "Password or email invalid!",
    "ResourceNotFoundError"
  );
  ExceptionHandler({ message: err.message, httpCode: "400" });
}
