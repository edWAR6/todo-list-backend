import { Request, Response, NextFunction } from 'express';
import { IDatabase, ServiceFactory } from '../../common';
import { MongoDB } from '../../mongoDB';
import { PostgreSQL } from '../../postgreSQL';

let database: IDatabase | undefined;

const getDatabase = (_: Request, res: Response, next: NextFunction) => {
  if (process.env.DATABASE) {
    const database = initializeDatabase(process.env.DATABASE);
    if (database) {
      res.locals.listService = (database as ServiceFactory).getListService();
      res.locals.itemService = (database as ServiceFactory).getItemService();
    } else {
      console.log('👾 DATABASE not correctly set.');
      next(new Error('Can\'t access the correct database.'));
    }
  } else {
    console.log('👾 DATABASE environmental variable is missing.');
    next(new Error('Can\'t access the database.'));
  }
}

const initializeDatabase = (name: string): IDatabase | undefined => {
  if (process.env.DATABASE === 'MongoDB') {
    database = new MongoDB();
  } else if (process.env.DATABASE === 'PostgreSQL') {
    database = new PostgreSQL();
  }
  return database;
}

export {
  getDatabase
};
