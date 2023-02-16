import Jwt, { Secret, Algorithm, JwtPayload } from "jsonwebtoken";
import fs from "fs";
import "dotenv";
type id = {
  id: string;
};

class JwToken {
  private privateKey: Secret = fs.readFileSync("./src/ssh/jwtRS256.key");
  tokenSign(id: string) {
    return Jwt.sign({ id: id }, this.privateKey as Secret, {
      algorithm: process.env.JWT_ALGORITHM as Algorithm,
      expiresIn: "24hr",
    });
  }

  tokenVerify(token: string) {
    return Jwt.verify(token, this.privateKey) as JwtPayload;
  }
}

export default new JwToken();
