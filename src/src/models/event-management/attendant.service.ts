import { BaseQuery } from "../../config/base-query"

export class AttendantService extends BaseQuery{

    async verifyIfExistAttendant (document: string, typeDocumentId: number): Promise <{id: number} | undefined> {
        try {
            return (await this.query('SELECT id FROM attendants WHERE document = $1 AND type_document_id = $2', [document, typeDocumentId]))?.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async createAttendant (assistantsValues: (string | number)[]) {
        try {
            return (await this.query('INSERT INTO attendants (name, document, type_document_id, email) VALUES ($1, $2, $3, $4) RETURNING id', assistantsValues)).rows[0];
        } catch (error) {
            throw error;
        }
    }
}

