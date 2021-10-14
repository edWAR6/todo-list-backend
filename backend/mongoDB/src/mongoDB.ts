import * as mongoDB from 'mongodb';
import * as dotenv from 'dotenv';
import { IDatabase, ItemService, ListService, ServiceFactory } from '../../common';
import { MongoDBItemService } from './item/item.service';
import { MongoDBListService } from './list/list.service';

export const collections: {
  lists?: mongoDB.Collection,
  items?: mongoDB.Collection,
} = {}

class MongoDB extends ServiceFactory implements IDatabase {
  client: mongoDB.MongoClient;
  database: mongoDB.Db | undefined;

  constructor() {
    super();
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

  public getListService(): ListService | undefined {
    collections.lists = this.database?.collection('lists');
    return collections.lists ? new MongoDBListService(collections.lists) : undefined;
  }

  public getItemService(): ItemService | undefined {
    collections.lists = this.database?.collection('items');
    return collections.items ? new MongoDBItemService(collections.items) : undefined;
  }
}

export {
  MongoDB
}
