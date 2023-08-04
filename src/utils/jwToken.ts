import "dotenv";
import fs from "fs";
import Jwt, { Algorithm, Secret } from "jsonwebtoken";

class JwToken {
  private privateKey: Secret = fs.readFileSync("./src/ssh/jwtRS256.key");
  Sign(id: string) {
    return Jwt.sign({ id: id }, this.privateKey as Secret, {
      algorithm: process.env.JWT_ALGORITHM as Algorithm,
      expiresIn: "24hr",
    });
  }

  Verify(token: string) {
    return Jwt.verify(token, this.privateKey);
  }
}

export default new JwToken();
