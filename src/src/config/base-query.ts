import { ConnectionDatabase } from './connection-database.config';

export class BaseQuery extends ConnectionDatabase{

    protected async query(text: string, params?: any[]): Promise<any> {
        const client = await this.pool.connect();

        try {
            const result = await client.query(text, params);
            return result;
        } catch (error) {
            console.error('Query error:', error);
            throw error;
        } finally {
            client.release();  
        }
    }

}