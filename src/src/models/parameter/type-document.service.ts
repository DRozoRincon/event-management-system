import { BaseQuery } from "../../config/base-query";

export class TypeDocumentService extends BaseQuery {
  async getTypeDocument(name: string): Promise<{ id: number } | undefined> {
    try {
      return (
        await this.query("SELECT id FROM type_documents WHERE name LIKE $1", [
          `%${name}%`,
        ])
      )?.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async getTypesDocument(): Promise<{ id: number; name: string } | undefined> {
    try {
      return (await this.query("SELECT id, name FROM type_documents"))?.rows;
    } catch (error) {
      throw error;
    }
  }
}
