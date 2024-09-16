import * as crypto from "crypto";

export class Encryption {
  constructor(
    private readonly cryptoInstance = crypto
  ){}

  hash(password: string) {
    return this.cryptoInstance.createHash("sha256").update(password).digest("hex");
  }

  compare(password: string, hash: string) {
    const enteredPasswordHash = this.hash(password);

    return enteredPasswordHash === hash;
  }
}
