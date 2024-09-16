import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../../config/http.response";
import { EventService } from "../../models/event-management/event.service";

export class ValidateBelongMiddleware {
  constructor(
    private readonly eventService: EventService = new EventService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  async validateBelongsEvent(req: Request, res: Response, next: NextFunction) {
    const eventBelongsUser = await this.eventService.eventBelongUser(
      req.body?.id ?? req.params?.id ?? req.body.eventId,
      req.user.id
    );

    if (!eventBelongsUser) {
      return this.httpResponse.Unauthorized(
        res,
        "This Data Does Not Belong To You"
      );
    }

    next();
  }
}
