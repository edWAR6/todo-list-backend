import { IItem } from "../item/item.interface";
import { ID } from "../types";

interface IList {
  id?: ID;
  name: string;
  items?: IItem[];
}

export {
  IList
};
