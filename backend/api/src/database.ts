import { Request, Response, NextFunction } from 'express';
import { IDatabase, ServiceFactory } from '../../common';
import { MongoDB } from '../../mongoDB';
import { PostgreSQL } from '../../postgreSQL';

let database: IDatabase | undefined;

const getDatabase = async (_: Request, res: Response, next: NextFunction) => {
  if (process.env.ACTIVE_DATABASE) {
    const database = await initializeDatabase(process.env.ACTIVE_DATABASE);
    if (database) {
      res.locals.listService = (database as ServiceFactory).getListService();
      res.locals.itemService = (database as ServiceFactory).getItemService();
      next();
    } else {
      console.log('👾 ACTIVE_DATABASE not correctly set.');
      next(new Error('Can\'t access the correct database.'));
    }
  } else {
    console.log('👾 ACTIVE_DATABASE environmental variable is missing.');
    next(new Error('Can\'t access the database.'));
  }
}

const initializeDatabase = async (name: string): Promise<IDatabase | undefined> => {
  if (process.env.ACTIVE_DATABASE === 'MongoDB') {
    database = new MongoDB();
  } else if (process.env.ACTIVE_DATABASE === 'PostgreSQL') {
    database = new PostgreSQL();
  }
  await database?.connect();
  return database;
}

export {
  getDatabase
};
