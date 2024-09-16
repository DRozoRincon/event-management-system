import { Request, Response } from "express";

import { HttpResponse } from "../../config/http.response";

import { UserService } from "../../models/authorization/user.service";

import { Encryption } from "../../utils/encryption.util";
import { JWT } from "../../utils/jwt.util";

export class AuthorizationController {
  constructor(
    private readonly userService: UserService = new UserService(),
    private readonly httpResponse: HttpResponse = new HttpResponse(),
    private readonly encryption: Encryption = new Encryption(),
    private readonly jwt: JWT = new JWT()
  ) {}

  async register({ body }: Request, res: Response) {
    try {
      const { name, email, password } = body;

      const existUser = await this.userService.verifyIfExistUser(email);

      if (existUser) {
        return this.httpResponse.Conflict(res, "User Already Exist");
      }

      const hash = this.encryption.hash(password);

      await this.userService.createUser([name, email, hash]);

      return this.httpResponse.Ok(res, true);
    } catch (error) {
      console.error(error);

      return this.httpResponse.Error(res);
    }
  }

  async login({ body }: Request, res: Response) {
    try {
      const { email, password } = body;

      const existUser = await this.userService.verifyIfExistUser(email);

      const correctCredentials = this.encryption.compare(
        password,
        existUser?.password ?? ""
      );

      if (!correctCredentials) {
        return this.httpResponse.Unauthorized(res, "Incorrect Credentials");
      }

      const token = this.jwt.sign({ email, id: existUser?.id });

      return this.httpResponse.Ok(res, "Bearer " + token);
    } catch (error) {
      console.error(error);

      return this.httpResponse.Error(res);
    }
  }
}
