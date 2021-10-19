import express, { Request, Response } from "express";
import { ItemService, IItem, ID } from "../../../common";

const itemRouter = express.Router({mergeParams: true});

itemRouter.post('/', async (req: Request, res: Response) => {
  const service = res.locals.itemService as ItemService;
  const listId: ID = req.params.listId;
  try {
    const item: IItem = req.body;
    const newItem = await service.createItem(listId, item);
    res.status(200).send(newItem);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

itemRouter.get('/', async (req: Request, res: Response) => {
  const service = res.locals.itemService as ItemService;
  const listId: ID = req.params.listId;
  
  try {
    const items = await service.getItems(listId);
    res.status(200).send(items);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

itemRouter.get('/:id', async (req: Request, res: Response) => {
  const service = res.locals.itemService as ItemService;
  const listId: ID = req.params.listId;
  const id: ID = req.params.id;
  try {
    const item = await service.getItem(listId, id);
    if (item) {
      res.status(200).send(item);
    } else {
      res.status(404).send('Item not found');
    }
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

itemRouter.delete('/:id', async (req: Request, res: Response) => {
  const service = res.locals.itemService as ItemService;
  const listId: ID = req.params.listId;
  const id: ID = req.params.id;
  try {
    const deleted = await service.deleteItem(listId, id);
    if (deleted) {
      res.status(200).send('Success');
    } else {
      res.status(404).send('Item not found');
    }
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

itemRouter.patch('/:id', async (req: Request, res: Response) => {
  const service = res.locals.itemService as ItemService;
  const listId: ID = req.params.listId;
  const id: ID = req.params.id;
  let updatedItem: IItem | null = null;
  try {
    const item: IItem = req.body;
    if (item.description) {
      updatedItem = await service.changeItemDescription(listId, id, item.description);
    }
    if (item.checked !== undefined) {
      updatedItem = await service.changeItemChecked(listId, id, item.checked);
    }
    if (updatedItem) {
      res.status(200).send(updatedItem);
    } else {
      res.status(404).send('Changes not applied');
    }
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

export {
  itemRouter
};
