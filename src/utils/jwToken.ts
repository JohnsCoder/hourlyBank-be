import fs from "fs";
import Jwt, { Algorithm, JwtPayload, Secret } from "jsonwebtoken";
class JwToken {
  private privateKey: Secret = fs.readFileSync("./src/ssh/jwtRS256.key");
  Sign(id: string) {
    return Jwt.sign({ id: id }, this.privateKey as Secret, {
      algorithm: process.env.JWT_ALGORITHM as Algorithm,
      expiresIn: "24hr",
    });
  }

  Verify(token: string) {
    return Jwt.verify(token, this.privateKey) as JwtPayload;
  }
}

export default new JwToken();
