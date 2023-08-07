import Jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import JwtException from "../exceptions/jwtException";
import jwToken from "../utils/jwToken";

export default (bearearToken: String) => {
  if (!bearearToken) throw JwtException(new JsonWebTokenError("invalid token"));
  const token = bearearToken.split(" ")[1];
  try {
    return jwToken.Verify(token);
  } catch (err) {
    console.log(err);
    if (err instanceof Jwt.JsonWebTokenError) throw JwtException(err);
  }
};
