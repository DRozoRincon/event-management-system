import { BaseQuery } from "../../config/base-query";
import { EventUpdateDto } from "../../validators/event-management/event-management-dto.validator";

export class EventService extends BaseQuery {
  async verifyIfExistEvent(name: string, userId: number, eventId = null) {
    try {
      return (
        await this.query(
          `SELECT id FROM events WHERE name = $1 AND user_id = $2 ${
            eventId ? ` AND id != ${eventId}` : ""
          }`,
          [name, userId]
        )
      )?.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async getEvent(id: string) {
    try {
      return (
        await this.query(
          `SELECT name, description, TO_CHAR(start_date, 'YYYY-MM-DD') AS "startDate", TO_CHAR(end_date, 'YYYY-MM-DD') AS "endDate", lat, long FROM events WHERE id = $1`,
          [id]
        )
      )?.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async getTotalEvents(filter: string, userId: number) {
    try {
      return (
        await this.query(
          "SELECT COUNT(*) AS total FROM events WHERE name LIKE $1 AND user_id = $2",
          [`%${filter}%`, userId]
        )
      )?.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async createEvent(eventValues: (string | number)[]) {
    try {
      return await this.query(
        "INSERT INTO events (name, description, start_date, end_date, lat, long, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7)",
        eventValues
      );
    } catch (error) {
      throw error;
    }
  }

  async updateEvent(eventValues: EventUpdateDto) {
    try {
      let setToUpdate = [];

      if (eventValues?.name) {
        setToUpdate.push(`name = '${eventValues.name}'`);
      }

      if (eventValues?.description) {
        setToUpdate.push(`description = '${eventValues.description}'`);
      }

      if (eventValues?.startDate) {
        setToUpdate.push(`start_date = '${eventValues.startDate}'`);
      }

      if (eventValues?.endDate) {
        setToUpdate.push(`end_date = '${eventValues.endDate}'`);
      }

      if (eventValues?.lat) {
        setToUpdate.push(`lat = ${eventValues.lat}`);
      }

      if (eventValues?.long) {
        setToUpdate.push(`long = ${eventValues.long}`);
      }

      const attributesToUpdate = setToUpdate.join(", ");

      return attributesToUpdate
        ? await this.query(
            `UPDATE events SET ${attributesToUpdate} WHERE id = $1`,
            [eventValues.id]
          )
        : null;
    } catch (error) {
      throw error;
    }
  }

  async deleteEvent(id: string) {
    try {
      return await this.query("DELETE FROM events WHERE id = $1", [id]);
    } catch (error) {
      throw error;
    }
  }

  async paginationEvents(
    filter: string,
    userId: number,
    offset: number,
    limit: number
  ) {
    try {
      return (
        await this.query(
          `SELECT id, name, TO_CHAR(start_date, 'YYYY-MM-DD') AS "startDate", TO_CHAR(end_date, 'YYYY-MM-DD') AS "endDate" FROM events WHERE name LIKE $1 AND user_id = $2 LIMIT $3 OFFSET $4`,
          [`%${filter}%`, userId, limit, offset]
        )
      )?.rows;
    } catch (error) {
      throw error;
    }
  }

  async eventBelongUser(id: string | number, userId: number) {
    try {
      return (
        await this.query(
          `SELECT id FROM events WHERE id = $1 AND user_id = $2`,
          [id, userId]
        )
      )?.rows[0];
    } catch (error) {
      throw error;
    }
  }
}
