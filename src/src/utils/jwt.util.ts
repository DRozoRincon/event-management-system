import * as jwt from "jsonwebtoken";
import { ConfigServer } from "../config/config-server.config";

declare module "express-serve-static-core" {
  interface Request {
    user?: any;
  }
}
export class JWT extends ConfigServer {
  constructor(private readonly jwtInstance = jwt) {
    super();
  }

  sign(payload: jwt.JwtPayload): string {
    return this.jwtInstance.sign(payload, this.getEnvironment("JWT_SECRET"), {
      expiresIn: this.getEnvironment("JWT_EXPIRES"),
    });
  }

  verify(token: string): string | jwt.JwtPayload {
    return this.jwtInstance.verify(token, this.getEnvironment("JWT_SECRET"));
  }
}
