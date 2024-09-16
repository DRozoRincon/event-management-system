import { Response } from "express";

import { HttpStatus } from "../enums/config.enums";

export class HttpResponse {
  Ok(res: Response, data?: any): Response {
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      statusMsg: "Success",
      data,
    });
  }

  NotFound(res: Response, error?: any): Response {
    return res.status(HttpStatus.NOT_FOUND).json({
      status: HttpStatus.NOT_FOUND,
      statusMsg: "Not Found",
      error,
    });
  }

  Unauthorized(res: Response, error?: any): Response {
    return res.status(HttpStatus.UNAUTHORIZED).json({
      status: HttpStatus.UNAUTHORIZED,
      statusMsg: "Unauthorized",
      error,
    });
  }

  Forbidden(res: Response, error?: any): Response {
    return res.status(HttpStatus.FORBIDDEN).json({
      status: HttpStatus.FORBIDDEN,
      statusMsg: "Forbidden",
      error,
    });
  }

  Conflict(res: Response, error?: any): Response {
    return res.status(HttpStatus.CONFLICT).json({
      status: HttpStatus.CONFLICT,
      statusMsg: "Conflict",
      error,
    });
  }

  BadRequest(res: Response, error?: any): Response {
    return res.status(HttpStatus.BAD_REQUEST).json({
      status: HttpStatus.BAD_REQUEST,
      statusMsg: "Bad request",
      error,
    });
  }

  Error(res: Response, error?: any): Response {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      statusMsg: "Internal server error",
      error,
    });
  }
}
