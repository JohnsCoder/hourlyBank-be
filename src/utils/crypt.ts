import {
  BinaryLike,
  CipherGCMTypes,
  createCipheriv,
  createDecipheriv,
  randomBytes,
  randomFillSync,
  scryptSync,
} from "crypto";
import("dotenv/config");

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

  decrypt(hash: string) {
    const hashEntries = hash.split("-");

    const cipher = hashEntries[0];
    const iv = Buffer.from(hashEntries[1], "hex");
    const key = Buffer.from(hashEntries[2], "hex");
    
    const decipher = createDecipheriv(
      this.algorithm as CipherGCMTypes,
      key,
      iv
    );
    return [
      decipher.update(cipher, "hex", "utf8"),
      decipher.final("utf8"),
    ].join("");
  }
}

export default new crypt();
