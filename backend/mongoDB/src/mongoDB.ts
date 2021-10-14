import * as mongoDB from 'mongodb';
import * as dotenv from 'dotenv';
import { IDatabase } from '../../common';

export const collections: {
  lists?: mongoDB.Collection,
  todos?: mongoDB.Collection,
} = {}

class MongoDB implements IDatabase {
  client: mongoDB.MongoClient;
  database: mongoDB.Db | undefined;

  constructor() {;
    dotenv.config();
    this.client = new mongoDB.MongoClient(process.env.CONNECTION_STRING!);
  }

  async connect(): Promise<void> {
    await this.client.connect();
    this.database = this.client.db(process.env.DB_NAME);

  }

  async disconnect(): Promise<void> {
    await this.client.close();
  }
}

export {
  MongoDB
}
