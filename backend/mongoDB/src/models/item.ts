import { ObjectId } from "mongodb";
import { IItem } from "../../../common";

export default class Item implements IItem {
  constructor(public description: string, public checked: boolean, public id?: ObjectId) {}
}
