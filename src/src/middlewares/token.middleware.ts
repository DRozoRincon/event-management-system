import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../config/http.response";
import { JWT } from "../utils/jwt.util";

export class TokenMiddleware {
  constructor(
    private readonly httpResponse: HttpResponse = new HttpResponse(),
    private readonly jwt: JWT = new JWT()
  ) {}

  validateToken(req: Request, res: Response, next: NextFunction) {
    const authorization = req.header("Authorization");

    if (!authorization){
        return this.httpResponse.Unauthorized(res, "There Is No Token");
    }

    if (!authorization.startsWith("Bearer ")){
        return this.httpResponse.Unauthorized(res, "Invalidates Bearer Convention");
    }

    const token = authorization.split(" ").at(1) || "";

    try {
        const userPayload = this.jwt.verify(token);

        req.user = userPayload;
    } catch (error) {
        return this.httpResponse.Unauthorized(res, "Invalid or Expired Token")
    }

    next();
  }
}
