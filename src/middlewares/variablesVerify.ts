import DataIntegrityViolationException from "../exceptions/dataException";
import { DataIntegrityError } from "../types/exceptions/DataIntegrityError";

export default (variables: Object) => {
  const variablesList = Object.values(variables);
  for (const variable of variablesList) {
    if (!variable) {
      throw DataIntegrityViolationException(
        new DataIntegrityError("Empty Values!")
      );
    }
  }
};
