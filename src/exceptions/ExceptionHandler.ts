import { GraphQLError } from "graphql";
import { STATUS_CODES } from "http";

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
