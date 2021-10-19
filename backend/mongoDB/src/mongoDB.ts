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
    
    this.client = new mongoDB.MongoClient(`mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:27017`);
  }

  async connect(): Promise<void> {
    await this.client.connect();
    this.database = this.client.db(process.env.DATABASE_NAME);
    console.log('🐵 MongoDB connected.');
  }

  async disconnect(): Promise<void> {
    await this.client.close();
  }

  public getListService(): ListService | undefined {
    collections.lists = this.database?.collection('lists');
    return collections.lists ? new MongoDBListService(collections.lists) : undefined;
  }

  public getItemService(): ItemService | undefined {
    collections.items = this.database?.collection('items');
    return collections.items ? new MongoDBItemService(collections.items) : undefined;
  }
}

export {
  MongoDB
}
