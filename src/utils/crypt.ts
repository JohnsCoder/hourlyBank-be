import {
  scryptSync,
  createCipheriv,
  randomBytes,
  randomFillSync,
  createDecipheriv,
  BinaryLike,
  CipherGCMTypes,
} from "node:crypto";
import("dotenv/config");

type Payload = {
  cipher: string;
  iv: Buffer;
  key: Buffer;
};

class crypt {
  private algorithm = process.env.CRYPT_ALGORITHM;
  private secretKey = process.env.SECRET_KEY;
  private iv = randomFillSync(Buffer.alloc(16));
  private key = scryptSync(this.secretKey as BinaryLike, randomBytes(16), 24);

  encrypt(payload: string) {
    const cipher = createCipheriv(
      this.algorithm as CipherGCMTypes,
      this.key,
      this.iv
    );

    return `${cipher.update(payload, "utf8", "hex")}${cipher.final(
      "hex"
    )}-${this.iv.toString("hex")}-${this.key.toString("hex")}`;
  }

  decrypt(hash: Payload) {
    const decipher = createDecipheriv(
      this.algorithm as CipherGCMTypes,
      hash.key,
      hash.iv
    );
    return [
      decipher.update(hash.cipher, "hex", "utf8"),
      decipher.final("utf8"),
    ].join("");
  }
}


export default crypt;
