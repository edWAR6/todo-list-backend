import { ID } from "../types";
import { IList } from "./list.interface";

interface ListService {
  createList: (list: IList) => Promise<IList>;
  getLists: () => Promise<IList[]>;
  getList: (id: ID) => Promise<IList>;
  deleteList: (id: ID) => Promise<boolean>;
  changeListName: (id: ID, name: string) => Promise<IList>;
}

export {
  ListService
};
