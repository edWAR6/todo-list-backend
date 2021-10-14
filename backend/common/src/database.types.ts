import { ItemService, ListService } from "..";

interface IDatabase {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  getListService: () => ListService | undefined;
  getItemService: () => ItemService | undefined;
}

export {
  IDatabase
};