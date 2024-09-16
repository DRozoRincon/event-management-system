import { BaseQuery } from "../../config/base-query"

export class AttendanceService extends BaseQuery{

    async verifyIfExistAttendance (date: string, eventId: number, attendantId: number): Promise <{id: number} | undefined> {
        try {
            return (await this.query("SELECT id FROM attendances WHERE date = $1 AND event_id = $2 AND attendant_id = $3", [date, eventId, attendantId]))?.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async getAttendancesByEvent (eventId: string): Promise <{date: string, name: string, document: string}[]> {
        try {
            return (await this.query(`
                SELECT TO_CHAR(ats.date, 'YYYY-MM-DD') AS date, att.name, att.document FROM attendances AS ats 
                INNER JOIN attendants AS att ON (ats.attendant_id = att.id)
                WHERE ats.event_id = $1
                ORDER BY ats.date, att.name
            `, [eventId]))?.rows;
        } catch (error) {
            throw error;
        }
    }

    async createAttendance (attendantValues: (string | number)[]) {
        try {
            return await this.query("INSERT INTO attendances (date, attendant_id, event_id) VALUES ($1, $2, $3)", attendantValues);
        } catch (error) {
            throw error;
        }
    }

    async deleteAttendance (id: string) {
        try {
            return await this.query("DELETE FROM attendances WHERE id = $1", [id]);
        } catch (error) {
            throw error;
        }
    }

    async deleteAttendanceByEventDateChange (id: string, startDate: string, endDate: string) {
        try {
            return await this.query("DELETE FROM attendances WHERE event_id = $1 AND (date < $2 OR date > $3)", [id, startDate, endDate]);
        } catch (error) {
            throw error;
        }
    }
}

