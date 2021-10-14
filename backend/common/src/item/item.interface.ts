import { ID } from "../types";

interface IItem {
  id?: ID;
  listId: ID;
  description: string;
  checked: boolean;
}

export {
  IItem
};
