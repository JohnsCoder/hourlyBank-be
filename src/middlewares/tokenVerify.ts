import Jwt from "jsonwebtoken";
import JwtException from "../exceptions/jwtException";
import jwToken from "../utils/jwToken";

export default (bearearToken: String) => {
  const token = bearearToken.split(" ")[1];
  try {
    return jwToken.Verify(token);
  } catch (err) {
    if (err instanceof Jwt.JsonWebTokenError) throw JwtException(err);
  }
};
