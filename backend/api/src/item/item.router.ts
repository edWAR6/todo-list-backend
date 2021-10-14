import express, { Request, Response } from "express";
import { ItemService, IItem } from "../../../common";

const itemRouter = express.Router();

itemRouter.get('/', async (req: Request, res: Response) => {
  try {
    const service = res.locals.itemService as ItemService;
    const listId = req.params.id;
    const items = service.getItems(listId);
    res.status(200).send(items);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

export {
  itemRouter
};
