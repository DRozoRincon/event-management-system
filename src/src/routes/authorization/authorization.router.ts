import { AuthorizationController } from "../../controllers/authorization/authorization.controller";
import { ValidatorMiddleware } from "../../middlewares/shared/validator.middleware";
import {
  CredentialsDto,
  UserDto,
} from "../../validators/authorization/authorization-dto.validator";
import { BaseRouter } from "../base.router";

export class AuthorizationRouter extends BaseRouter<
  AuthorizationController,
  ValidatorMiddleware
> {
  constructor() {
    super(AuthorizationController, ValidatorMiddleware);
  }

  routes(): void {
    /**
     * @swagger
     * /api/authorization/register:
     *  post:
     *      summary: User registration
     *      tags:
     *          - Authorization
     *      requestBody:
     *          description: Required parameters
     *          required: true
     *          content:
     *              application/json:
     *                  schema:
     *                      properties:
     *                          name:
     *                              type: string
     *                              example: Carlos
     *                          email:
     *                              type: string
     *                              format: email
     *                              example: email@gmail.com
     *                          password:
     *                              type: string
     *                              format: password
     *                              example: password123
     *                      required:
     *                          - email
     *                          - password
     *                          - name
     *      responses:
     *          200:
     *              description: Successful process
     *          409:
     *              description: Resource already exists
     *          500:
     *              description: Internal server error
     */
    this.router.post(
      "/authorization/register",
      (req, res, next) => [
        this.validatorMiddleware?.validateRequest(req, res, next, UserDto),
      ],
      (req, res) => this.controller.register(req, res)
    );

    /**
     * @swagger
     * /api/authorization/login:
     *  post:
     *      summary: User login
     *      tags:
     *          - Authorization
     *      requestBody:
     *          description: Required parameters
     *          required: true
     *          content:
     *              application/json:
     *                  schema:
     *                      properties:
     *                          email:
     *                              type: string
     *                              format: email
     *                              example: email@gmail.com
     *                          password:
     *                              type: string
     *                              format: password
     *                              example: password123
     *                      required:
     *                          - email
     *                          - password
     *      responses:
     *          200:
     *              description: Successful process
     *          401:
     *              description: Unauthorized
     *          500:
     *              description: Internal server error
     */
    this.router.post(
      "/authorization/login",
      (req, res, next) => [
        this.validatorMiddleware?.validateRequest(
          req,
          res,
          next,
          CredentialsDto
        ),
      ],
      (req, res) => this.controller.login(req, res)
    );
  }
}
