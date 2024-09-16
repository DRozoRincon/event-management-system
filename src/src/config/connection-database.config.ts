import { Pool } from 'pg';
import * as dotenv from "dotenv";

dotenv.config({
    path:
      process.env.NODE_ENV !== undefined
        ? `.${process.env.NODE_ENV.trim()}.env`
        : ".env",
  });

export class ConnectionDatabase {

    protected pool = new Pool({
        host: process.env.PG_HOST,
        port: Number(process.env.PG_PORT),
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        database: process.env.PG_DATABASE
    });

    protected async checkConnection(): Promise<void> {
        try {
            const client = await this.pool.connect();
            console.log('Connected to database');
            client.release(); 
        } catch (error) {
            console.error('Database connection failed:', error);
        }
    }


}