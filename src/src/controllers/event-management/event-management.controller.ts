import { Request, Response } from "express";
import { HttpResponse } from "../../config/http.response";
import { EventService } from "../../models/event-management/event.service";
import { AttendantService } from "../../models/event-management/attendant.service";
import { AttendanceService } from "../../models/event-management/attendance.service";
import { GeneralProperties } from "../../enums/shared.enums";

export class EventManagementController {
  constructor(
    private readonly httpResponse: HttpResponse = new HttpResponse(),
    private readonly eventService: EventService = new EventService(),
    private readonly attendantService: AttendantService = new AttendantService(),
    private readonly attendanceService: AttendanceService = new AttendanceService()
  ) {}

  async createEvent(req: Request, res: Response) {
    try {
      const { name, description, startDate, endDate, lat, long } = req.body;

      const userId = req.user.id;

      if (new Date(startDate) > new Date(endDate)) {
        return this.httpResponse.BadRequest(res, "The Start Date Should Be Lower or Equal Than End Date");
      }

      const existEvent = await this.eventService.verifyIfExistEvent(
        name,
        userId
      );

      if (existEvent) {
        return this.httpResponse.Conflict(res, "Already Exist Event");
      }

      await this.eventService.createEvent([
        name,
        description,
        startDate,
        endDate,
        lat,
        long,
        userId,
      ]);

      return this.httpResponse.Ok(res, true);
    } catch (error) {
      console.error(error);

      return this.httpResponse.Error(res);
    }
  }

  async deleteEvent(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await this.eventService.deleteEvent(id);

      return this.httpResponse.Ok(res, true);
    } catch (error) {
      console.error(error);

      return this.httpResponse.Error(res);
    }
  }

  async createAttendance(req: Request, res: Response) {
    try {
      const { name, document, typeDocumentId, email, date, eventId } = req.body;

      const existEvent = await this.eventService.getEvent(eventId);
      
      const dateIsCorrectToEvent = (new Date(date) >= new Date(existEvent?.startDate) && new Date(date) <= new Date(existEvent?.endDate));
      
      if(!existEvent || !dateIsCorrectToEvent){
        return this.httpResponse.BadRequest(res, "Incorrect data eventId or date");
      }

      const existAttendant = await this.attendantService.verifyIfExistAttendant(
        document,
        typeDocumentId
      );
      
      let attendantId: number = existAttendant
      ? existAttendant?.id
      : (
          await this.attendantService.createAttendant([
            name,
            document,
            typeDocumentId,
            email,
          ])
      )?.id;

      const existAttendance = await this.attendanceService.verifyIfExistAttendance(
        date,
        eventId,
        attendantId
      );

      if (existAttendance) {
        return this.httpResponse.Conflict(res, "Already Exist Attendance");
      }

      await this.attendanceService.createAttendance([date, attendantId, eventId]);

      return this.httpResponse.Ok(res, true);
    } catch (error) {
      console.error(error);

      return this.httpResponse.Error(res);
    }
  }

  async deleteAttendance(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await this.attendanceService.deleteAttendance(id);

      return this.httpResponse.Ok(res, true);
    } catch (error) {
      console.error(error);

      return this.httpResponse.Error(res);
    }
  }

  async getEvent(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const [eventData, attendantsData] = await Promise.all([
        this.eventService.getEvent(id),
        this.attendanceService.getAttendancesByEvent(id),
      ]);

      let attendantsOrganizeByDate: any = {};

      for (const attendantData of attendantsData) {
        const { date, name, document } = attendantData;

        if (!attendantsOrganizeByDate[date]) {
          attendantsOrganizeByDate[date] = {date, attendants: []};
        }

        attendantsOrganizeByDate[date].attendants.push({
          name,
          document,
        });
      }

      return this.httpResponse.Ok(res, {
        event: eventData ?? {},
        attendantsOrganizeByDate:  Object.values(attendantsOrganizeByDate)
      });
    } catch (error) {
      console.error(error);

      return this.httpResponse.Error(res);
    }
  }

  async listEvents(req: Request, res: Response) {
    try {
      const { page, filter } = req.query;
      const userId = req.user.id;

      const offset = (Number(page) - 1) * GeneralProperties.PAGE_SIZE;

      const [totalEvents, paginationEvents] = await Promise.all([
        this.eventService.getTotalEvents(String(filter ?? ""), userId),
        this.eventService.paginationEvents(String(filter ?? ""), userId, offset, GeneralProperties.PAGE_SIZE)
      ]);

      const totalPages = Math.ceil(parseFloat(totalEvents?.total) / GeneralProperties.PAGE_SIZE);
      
      return this.httpResponse.Ok(res, {
        data: paginationEvents,
        totalPages
      });
    } catch (error) {
      console.error(error);

      return this.httpResponse.Error(res);
    }
  }

  async updateEvent(req: Request, res: Response) {
    try {
      let {id, startDate, endDate, name} = req.body;
      const userId = req.user.id;
      
      const existEvent = await this.eventService.verifyIfExistEvent(
        name,
        userId,
        id
      );

      if (existEvent) {
        return this.httpResponse.Conflict(res, "Already Exist Event");
      }

      const eventBefore = await this.eventService.getEvent(id);

      startDate = startDate ?? eventBefore?.startDate;
      endDate = endDate ?? eventBefore?.endDate;
      
      if (new Date(startDate) > new Date(endDate)) {
        return this.httpResponse.BadRequest(res, "The Start Date Should Be Lower or Equal Than End Date");
      }

      await Promise.all([
        this.attendanceService.deleteAttendanceByEventDateChange(id, startDate, endDate),
        this.eventService.updateEvent(req.body)
      ]);

      return this.httpResponse.Ok(res, true);
    } catch (error) {
      console.error(error);

      return this.httpResponse.Error(res);
    }
  }

  async eventReport(req: Request, res: Response) {
    try {
      const { startDate, endDate } = req.query;

      const attendantsData = await this.attendanceService.attendantByEventReport(String(startDate), String(endDate), req.user.id);

      let groupingEventReport: any = {};

      for (const attendantData of attendantsData) {
        const { date, name, document, eventName } = attendantData;

        if (!groupingEventReport[date]) {
          groupingEventReport[date] = {date, events: {}};
        }

        if(!groupingEventReport[date].events[eventName]) {
          groupingEventReport[date].events[eventName] = {eventName, detailAttendance: { totalAttendance: 0, listAttendants: []}};
        }

        groupingEventReport[date].events[eventName].detailAttendance.totalAttendance += 1;
        groupingEventReport[date].events[eventName].detailAttendance.listAttendants.push({
          name,
          document,
        });
      }

      let eventReport = [];
      
      const convertInArrayEventReport: ({date: string, events: Object})[] = Object.values(groupingEventReport);

      for(const eventReportByDate of convertInArrayEventReport) {
        eventReportByDate.events = Object.values(eventReportByDate.events);
        eventReport.push(eventReportByDate);
      }

      return this.httpResponse.Ok(res, eventReport)

    } catch (error) {
      console.error(error);

      return this.httpResponse.Error(res);
    }
  }

}
