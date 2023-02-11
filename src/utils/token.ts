import jwt, { VerifyCallback, JwtPayload, Secret } from "jsonwebtoken";
import "dotenv";

function token(id: string) {
  return jwt.sign(
     { id: id }, 
     process.env.SECRET_KEY as Secret, 
     { expiresIn: "24hr"});
}

export default token     