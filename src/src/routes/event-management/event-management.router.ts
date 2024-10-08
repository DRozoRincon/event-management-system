import { EventManagementController } from "../../controllers/event-management/event-management.controller";
import { ValidateBelongMiddleware } from "../../middlewares/event-management/validate-belong.middleware";
import { MulterMiddleware } from "../../middlewares/shared/multer.middleware";
import { TokenMiddleware } from "../../middlewares/shared/token.middleware";
import { ValidatorMiddleware } from "../../middlewares/shared/validator.middleware";
import {
  AttendanceDto,
  DateRangeDto,
  EventDto,
  EventUpdateDto,
  PaginationDto,
} from "../../validators/event-management/event-management-dto.validator";
import { IdentifierDto } from "../../validators/shared/shared.dto";

import { BaseRouter } from "../base.router";

export class EventManagementRouter extends BaseRouter<
  EventManagementController,
  ValidatorMiddleware,
  TokenMiddleware,
  MulterMiddleware,
  ValidateBelongMiddleware
> {
  constructor() {
    super(
      EventManagementController,
      ValidatorMiddleware,
      TokenMiddleware,
      MulterMiddleware,
      ValidateBelongMiddleware
    );
  }

  routes(): void {
    /**
     * @swagger
     * /api/event-management/create-event:
     *  post:
     *      summary: Create Event
     *      security:
     *          - apiAuth: []
     *      tags:
     *          - Event Management
     *      requestBody:
     *          description: Required parameters
     *          required: true
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      properties:
     *                          name:
     *                              type: string
     *                              example: Evento 3
     *                          description:
     *                              type: string
     *                              example: descripcion
     *                          startDate:
     *                              type: string
     *                              format: date
     *                              example: 2024-09-01
     *                          endDate:
     *                              type: string
     *                              format: date
     *                              example: 2024-09-30
     *                          lat:
     *                              type: number
     *                              format: float
     *                              example: 6.2447
     *                          long:
     *                              type: number
     *                              format: float
     *                              example: -75.5899
     *                      required:
     *                          - name
     *                          - description
     *                          - startDate
     *                          - endDate
     *                          - lat
     *                          - long
     *      responses:
     *          200:
     *              description: Successful process
     *          400:
     *              description: Incorrect data
     *          409:
     *              description: The resource already exists
     *          401:
     *              description: Unauthorized
     *          500:
     *              description: Internal server error
     */
    this.router.post(
      "/event-management/create-event",
      (req, res, next) => {
        this.securityMiddleware?.validateToken(req, res, next);
      },
      async (req, res, next) => [
        await this.validatorMiddleware?.validateRequest(
          req,
          res,
          next,
          EventDto
        ),
      ],
      (req, res) => this.controller.createEvent(req, res)
    );

    /**
     * @swagger
     * /api/event-management/create-attendance:
     *  post:
     *      summary: Create Attendance
     *      security:
     *          - apiAuth: []
     *      tags:
     *          - Event Management
     *      requestBody:
     *          description: Required parameters
     *          required: true
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      properties:
     *                          date:
     *                              type: string
     *                              format: date
     *                              example: 2024-11-30
     *                          eventId:
     *                              type: number
     *                              example: 1
     *                          name:
     *                              type: string
     *                              example: Carlos
     *                          typeDocumentId:
     *                              type: number
     *                              example: 1
     *                          document:
     *                              type: string
     *                              example: 1053874446
     *                          email:
     *                              type: string
     *                              example: david.rozor@autonoma.edu.co
     *                      required:
     *                          - date
     *                          - eventId
     *                          - name
     *                          - typeDocumentId
     *                          - document
     *                          - email
     *      responses:
     *          200:
     *              description: Successful process
     *          400:
     *              description: Incorrect data
     *          409:
     *              description: The resource already exists
     *          401:
     *              description: Unauthorized
     *          500:
     *              description: Internal server error
     */
    this.router.post(
      "/event-management/create-attendance",
      (req, res, next) => {
        this.securityMiddleware?.validateToken(req, res, next);
      },
      async (req, res, next) => [
        await this.validatorMiddleware?.validateRequest(
          req,
          res,
          next,
          AttendanceDto
        ),
      ],
      async (req, res, next) => [
        await this.belongMiddleware.validateBelongsEvent(req, res, next),
      ],
      (req, res) => this.controller.createAttendance(req, res)
    );

    /**
     * @swagger
     * /api/event-management/delete-event/{id}:
     *  delete:
     *      summary: Delete Event
     *      security:
     *          - apiAuth: []
     *      tags:
     *          - Event Management
     *      parameters:
     *        - name: id
     *          in: path
     *          required: true
     *          schema:
     *            type: number
     *      responses:
     *          200:
     *              description: Successful process
     *          401:
     *              description: Unauthorized
     *          500:
     *              description: Internal server error
     */
    this.router.delete(
      "/event-management/delete-event/:id",
      (req, res, next) => {
        this.securityMiddleware?.validateToken(req, res, next);
      },
      async (req, res, next) => [
        await this.validatorMiddleware?.validateRequest(
          req,
          res,
          next,
          IdentifierDto
        ),
      ],
      async (req, res, next) => [
        await this.belongMiddleware.validateBelongsEvent(req, res, next),
      ],
      (req, res) => this.controller.deleteEvent(req, res)
    );

    /**
     * @swagger
     * /api/event-management/delete-attendance/{id}:
     *  delete:
     *      summary: Delete Attendance
     *      security:
     *          - apiAuth: []
     *      tags:
     *          - Event Management
     *      parameters:
     *        - name: id
     *          in: path
     *          required: true
     *          schema:
     *            type: number
     *      responses:
     *          200:
     *              description: Successful process
     *          401:
     *              description: Unauthorized
     *          500:
     *              description: Internal server error
     */
    this.router.delete(
      "/event-management/delete-attendance/:id",
      (req, res, next) => {
        this.securityMiddleware?.validateToken(req, res, next);
      },
      async (req, res, next) => [
        await this.validatorMiddleware?.validateRequest(
          req,
          res,
          next,
          IdentifierDto
        ),
      ],
      (req, res) => this.controller.deleteAttendance(req, res)
    );

    /**
     * @swagger
     * /api/event-management/get-event/{id}:
     *  get:
     *      summary: Get Event
     *      security:
     *          - apiAuth: []
     *      tags:
     *          - Event Management
     *      parameters:
     *        - name: id
     *          in: path
     *          required: true
     *          schema:
     *            type: number
     *      responses:
     *          200:
     *              description: Successful process
     *          401:
     *              description: Unauthorized
     *          500:
     *              description: Internal server error
     */
    this.router.get(
      "/event-management/get-event/:id",
      (req, res, next) => {
        this.securityMiddleware?.validateToken(req, res, next);
      },
      async (req, res, next) => [
        await this.validatorMiddleware?.validateRequest(
          req,
          res,
          next,
          IdentifierDto
        ),
      ],
      async (req, res, next) => [
        await this.belongMiddleware.validateBelongsEvent(req, res, next),
      ],
      (req, res) => this.controller.getEvent(req, res)
    );

    /**
     * @swagger
     * /api/event-management/list-events:
     *  get:
     *      summary: List Events
     *      security:
     *          - apiAuth: []
     *      tags:
     *          - Event Management
     *      parameters:
     *        - name: page
     *          in: query
     *          required: true
     *          schema:
     *            type: number
     *        - name: filter
     *          in: query
     *          required: false
     *          schema:
     *            type: string
     *      responses:
     *          200:
     *              description: Successful process
     *          401:
     *              description: Unauthorized
     *          500:
     *              description: Internal server error
     */
    this.router.get(
      "/event-management/list-events",
      (req, res, next) => {
        this.securityMiddleware?.validateToken(req, res, next);
      },
      async (req, res, next) => [
        await this.validatorMiddleware?.validateRequest(
          req,
          res,
          next,
          PaginationDto
        ),
      ],
      (req, res) => this.controller.listEvents(req, res)
    );

    /**
     * @swagger
     * /api/event-management/update-event:
     *  put:
     *      summary: Update Event
     *      security:
     *          - apiAuth: []
     *      tags:
     *          - Event Management
     *      requestBody:
     *          description: Required parameters
     *          required: true
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      properties:
     *                          id:
     *                              type: number,
     *                              example: 1
     *                          name:
     *                              type: string
     *                              example: Evento 3
     *                          description:
     *                              type: string
     *                              example: descripcion
     *                          startDate:
     *                              type: string
     *                              format: date
     *                              example: 2024-09-01
     *                          endDate:
     *                              type: string
     *                              format: date
     *                              example: 2024-09-30
     *                          lat:
     *                              type: number
     *                              format: float
     *                              example: 6.2447
     *                          long:
     *                              type: number
     *                              format: float
     *                              example: -75.5899
     *                      required:
     *                          - id
     *      responses:
     *          200:
     *              description: Successful process
     *          400:
     *              description: Incorrect data
     *          409:
     *              description: The resource already exists
     *          401:
     *              description: Unauthorized
     *          500:
     *              description: Internal server error
     */
    this.router.put(
      "/event-management/update-event",
      (req, res, next) => {
        this.securityMiddleware?.validateToken(req, res, next);
      },
      async (req, res, next) => [
        await this.validatorMiddleware?.validateRequest(
          req,
          res,
          next,
          EventUpdateDto
        ),
      ],
      async (req, res, next) => [
        await this.belongMiddleware.validateBelongsEvent(req, res, next),
      ],
      (req, res) => this.controller.updateEvent(req, res)
    );

    /**
     * @swagger
     * /api/event-management/event-attendance-report:
     *  get:
     *      summary: Event Attendance Report
     *      security:
     *          - apiAuth: []
     *      tags:
     *          - Event Management
     *      parameters:
     *        - name: startDate
     *          in: query
     *          required: true
     *          schema:
     *            type: string
     *        - name: endDate
     *          in: query
     *          required: true
     *          schema:
     *            type: string
     *      responses:
     *          200:
     *              description: Successful process
     *          401:
     *              description: Unauthorized
     *          500:
     *              description: Internal server error
     */
    this.router.get(
      "/event-management/event-attendance-report",
      (req, res, next) => {
        this.securityMiddleware?.validateToken(req, res, next);
      },
      async (req, res, next) => [
        await this.validatorMiddleware?.validateRequest(
          req,
          res,
          next,
          DateRangeDto
        ),
      ],
      (req, res) => this.controller.eventAttendanceReport(req, res)
    );

    /**
     * @swagger
     * /api/event-management/download-template:
     *  get:
     *      summary: Download Template
     *      security:
     *          - apiAuth: []
     *      tags:
     *          - Event Management
     *      responses:
     *          200:
     *              description: Successful process
     *          401:
     *              description: Unauthorized
     *          500:
     *              description: Internal server error
     */
    this.router.get(
      "/event-management/download-template",
      (req, res, next) => {
        this.securityMiddleware?.validateToken(req, res, next);
      },
      (req, res) => this.controller.downloadTemplate(req, res)
    );

    /**
     * @swagger
     * /api/event-management/file-registration-attendance:
     *  post:
     *      summary: File Attendances
     *      security:
     *          - apiAuth: []
     *      tags:
     *          - Event Management
     *      requestBody:
     *          description: Required parameters
     *          required: true
     *          content:
     *              multipart/form-data:
     *                  schema:
     *                      type: object
     *                      properties:
     *                          file:
     *                             type: string
     *                             format: binary
     *                             description: The file to upload
     *      responses:
     *          200:
     *              description: Successful process
     *          401:
     *              description: Unauthorized
     *          500:
     *              description: Internal server error
     */
    this.router.post(
      "/event-management/file-registration-attendance",
      (req, res, next) => {
        this.securityMiddleware?.validateToken(req, res, next);
      },
      this.genericMiddleware.singleFile("file"),
      (req, res) => this.controller.automaticAttendanceRegistration(req, res)
    );

    /**
     * @swagger
     * /api/event-management/get-nearby-places/{id}:
     *  get:
     *      summary: Get Nearby Places
     *      security:
     *          - apiAuth: []
     *      tags:
     *          - Event Management
     *      parameters:
     *        - name: id
     *          in: path
     *          required: true
     *          schema:
     *            type: number
     *      responses:
     *          200:
     *              description: Successful process
     *          401:
     *              description: Unauthorized
     *          500:
     *              description: Internal server error
     */
    this.router.get(
      "/event-management/get-nearby-places/:id",
      (req, res, next) => {
        this.securityMiddleware?.validateToken(req, res, next);
      },
      async (req, res, next) => [
        await this.validatorMiddleware?.validateRequest(
          req,
          res,
          next,
          IdentifierDto
        ),
      ],
      async (req, res, next) => [
        await this.belongMiddleware.validateBelongsEvent(req, res, next),
      ],
      (req, res) => this.controller.getNearbyPlaces(req, res)
    );
  }
}
