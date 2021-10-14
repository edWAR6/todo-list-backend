import express, { Request, Response } from "express";
import { ListService, IList } from "../../../common";

const listRouter = express.Router();

listRouter.get('/', async (_: Request, res: Response) => {
  try {
    const service = res.locals.listService as ListService;
    const lists = service.getLists();
    res.status(200).send(lists);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

export {
  listRouter
};
