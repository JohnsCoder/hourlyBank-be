import jwt from "jsonwebtoken";

export namespace JwtVerifyErrors {
  export const JsonWebTokenError = jwt.JsonWebTokenError;
  export const NotBeforeError = jwt.NotBeforeError;
  export const TokenExpiredError = jwt.TokenExpiredError;
}
