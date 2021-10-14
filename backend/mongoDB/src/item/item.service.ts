import { Collection } from 'mongodb';
import { ID, IItem, ItemService } from "../../../common";

class MongoDBItemService implements ItemService {

  constructor(private collection: Collection){}

  async createItem(item: IItem): Promise<IItem> {
    const inserted = await this.collection.insertOne(item);
    const result = await this.getItem(item.listId, inserted.insertedId);
    return result;
  }

  async getItems(listId: ID): Promise<IItem[]> {
    const items = (await this.collection.find({ listId }).toArray()) as IItem[];
    return items;
  }

  async getItem(listId: ID, id: ID): Promise<IItem> {
    const query = { _id: id, listId };
    const item = (await this.collection.findOne(query)) as IItem;
    return item;
  }

  async deleteItem(listId: ID, id: ID): Promise<boolean> {
    const query = { _id: id, listId };
    const result = await this.collection.deleteOne(query);
    return (result && result.deletedCount > 0);
  }

  async changeItemDescription(listId: ID, id: ID, description: string): Promise<IItem> {
    const query = { _id: id, listId };
    await this.collection.updateOne(query, { $set: { $set: { description } } });
    const item = await this.getItem(listId, id);
    return item;
  }

  async changeItemChecked(listId: ID, id: ID, checked: boolean): Promise<IItem> {
    const query = { _id: id, listId };
    await this.collection.updateOne(query, { $set: { $set: { checked } } });
    const item = await this.getItem(listId, id);
    return item;
  }
}

export {
  MongoDBItemService
};
