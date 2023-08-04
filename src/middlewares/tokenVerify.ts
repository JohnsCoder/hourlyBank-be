import Jwt, { JwtPayload } from "jsonwebtoken";
import JwtException from "../exceptions/jwtException";
import jwToken from "../utils/jwToken";

export default (bearearToken: String) => {
  const token = bearearToken.split(" ")[1];
  try {
    return jwToken.Verify(token);
  } catch (err) {
    console.log(err);
    if (err instanceof Jwt.JsonWebTokenError) throw JwtException(err);
  }
};
