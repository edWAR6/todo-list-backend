import { Pool, PoolClient } from'pg';
import * as dotenv from 'dotenv';
import { IDatabase, ItemService, ListService, ServiceFactory } from "../../common";
import { PostgreSQLListService } from './list/list.service';
import { PostgreSQLItemService } from './item/item.service';

class PostgreSQL extends ServiceFactory implements IDatabase {
  client: Pool;
  database: PoolClient | undefined;

  constructor(){
    super();
    dotenv.config();
    
    this.client = new Pool({
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      max: 20,
      database: process.env.DATABASE_NAME,
      password: process.env.DATABASE_PASSWORD,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000
    });
  }

  async connect(): Promise<void> {
    this.database = await this.client.connect();
    console.log('🐘 PostgreSQL connected.');
  }

  async disconnect(): Promise<void> {
    await this.client?.end();
  }

  public getListService(): ListService | undefined {
    return this.database ? new PostgreSQLListService(this.database) : undefined;
  }
  public getItemService(): ItemService | undefined {
    return this.database ? new PostgreSQLItemService(this.database) : undefined;
  }
}

export {
  PostgreSQL
}
