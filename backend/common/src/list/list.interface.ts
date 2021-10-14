import { IItem } from "../item/item.interface";

interface IList {
  id?: any;
  name: string;
  items?: IItem[];
}

export {
  IList
};
