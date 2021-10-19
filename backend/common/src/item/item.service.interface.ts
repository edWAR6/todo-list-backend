import { ID } from "../types";
import { IItem } from "./item.interface";

interface ItemService {
  createItem: (listId: ID, item: IItem) => Promise<IItem>;
  getItems: (listId: ID) => Promise<IItem[]>;
  getItem: (listId: ID, id: ID) => Promise<IItem>;
  deleteItem: (listId: ID, id: ID) => Promise<boolean>;
  changeItemDescription: (listId: ID, id: ID, description: string) => Promise<IItem>;
  changeItemChecked: (listId: ID, id: ID, checked: boolean) => Promise<IItem>;
}

export {
  ItemService
};
