import { Pool, PoolClient } from'pg';
import * as dotenv from 'dotenv';
import { IDatabase } from "../../common";

class PostgreSQL implements IDatabase {
  client: Pool;
  database: PoolClient | undefined;

  constructor(){
    dotenv.config();
    this.client = new Pool({
      host: process.env.HOST,
      user: process.env.USER,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000
    });
  }

  async connect(): Promise<void> {
    this.database = await this.client.connect();
  }

  async disconnect(): Promise<void> {
    await this.database?.release(true);
  }
}

export {
  PostgreSQL
}
