import { ObjectId } from "mongodb";
import { IItem, IList } from "../../../common";

export default class List implements IList {
  constructor(public name: string, public items?: IItem[], public id?: ObjectId) {}
}
