import * as dotenv from "dotenv";

import { ConnectionDatabase } from "./connection-database.config";

export abstract class ConfigServer extends ConnectionDatabase {
  constructor() {
    super();

    const nodeNameEnv = this.createPathEnv(this.nodeEnv);
    dotenv.config({
      path: nodeNameEnv,
    });
  }

  protected getEnvironment(k: string): string {
    return process.env[k] ?? "";
  }

  protected getNumberEnv(k: string): number {
    return Number(this.getEnvironment(k));
  }

  protected get nodeEnv(): string {
    return this.getEnvironment("NODE_ENV")?.trim() || "";
  }

  protected createPathEnv(path: string): string {
    const arrEnv: Array<string> = ["env"];

    if (path.length > 0) {
      const stringToArray = path.split(".");
      arrEnv.unshift(...stringToArray);
    }
    return "." + arrEnv.join(".");
  }
}
