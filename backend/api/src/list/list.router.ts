import express, { Request, Response } from "express";
import { ListService, IList, ID } from "../../../common";

const listRouter = express.Router();

listRouter.post('/', async (req: Request, res: Response) => {
  const service = res.locals.listService as ListService;
  try {
    const list: IList = req.body;
    const newList = await service.createList(list);
    res.status(200).send(newList);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

listRouter.get('/', async (_: Request, res: Response) => {
  const service = res.locals.listService as ListService;
  try {
    const lists = await service.getLists();
    res.status(201).send(lists);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

listRouter.get('/:id', async (req: Request, res: Response) => {
  const service = res.locals.listService as ListService;
  const id: ID = req.params.id;
  try {
    const list = await service.getList(id);
    if (list) {
      res.status(200).send(list);
    } else {
      res.status(404).send('List not found');
    }
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

listRouter.delete('/:id', async (req: Request, res: Response) => {
  const service = res.locals.listService as ListService;
  const id: ID = req.params.id;
  try {
    const deleted = await service.deleteList(id);
    if (deleted) {
      res.status(200).send('Success');
    } else {
      res.status(404).send('List not found');
    }
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

listRouter.patch('/:id', async (req: Request, res: Response) => {
  const service = res.locals.listService as ListService;
  const id: ID = req.params.id;
  try {
    const list: IList = req.body;
    if (list.name) {
      const updatedList: IList = await service.changeListName(id, list.name);
      res.status(200).send(updatedList);
    } else {
      res.status(404).send('Changes not applied');
    }
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

export {
  listRouter
};
