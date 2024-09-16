import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { HttpResponse } from "../../config/http.response";

export class ValidatorMiddleware {
  constructor(
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  async validateRequest(
    req: Request,
    res: Response,
    next: NextFunction,
    cls: any
  ) {
    const instance = plainToInstance(cls, {
      ...req.body,
      ...req.params,
      ...req.query,
    });
    const errors = await validate(instance);

    if (errors.length > 0) {
      return this.httpResponse.BadRequest(
        res,
        errors.map((error) => ({
          property: error.property,
          constraints: error.constraints,
        }))
      );
    }

    next();
  }
}
