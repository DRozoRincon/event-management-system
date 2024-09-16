import { Router } from "express";

export class BaseRouter<T, V = undefined, S = undefined, G = any, B = any> {
  public router: Router;
  public controller: T;
  public validatorMiddleware: V | undefined;
  public securityMiddleware: S | undefined;
  public genericMiddleware: G | any;
  public belongMiddleware: G | any;

  constructor(
    TController: { new (): T },
    VValidatorMiddleware: { new (): V } | undefined = undefined,
    SSecurityMiddleware: { new (): S } | undefined = undefined,
    GGenericMiddleware: { new (): G } | any = undefined,
    BBelongMiddleware: { new (): G } | any = undefined
  ) {
    this.router = Router();
    this.controller = new TController();

    this.validatorMiddleware = VValidatorMiddleware
      ? new VValidatorMiddleware()
      : undefined;
    this.securityMiddleware = SSecurityMiddleware
      ? new SSecurityMiddleware()
      : undefined;
    this.genericMiddleware = GGenericMiddleware
      ? new GGenericMiddleware()
      : undefined;
    this.belongMiddleware = BBelongMiddleware
      ? new BBelongMiddleware()
      : undefined;

    this.routes();
  }

  routes() {}
}

/**
 * @swagger
 * components:
 *  securitySchemes:
 *    apiAuth:
 *      type: apiKey
 *      in: header
 *      name: Authorization
 */
