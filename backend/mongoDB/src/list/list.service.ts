import { Collection, ObjectId } from 'mongodb';
import { ID, IList, ListService } from "../../../common";

class MongoDBListService implements ListService {

  constructor(private collection: Collection){}

  async createList(list: IList): Promise<IList> {
    const inserted = await this.collection.insertOne(list);
    const result = await this.getList(inserted.insertedId.toString());
    return result;
  }

  async getLists(): Promise<IList[]> {
    const lists = (await this.collection.find({}).toArray()) as IList[];
    return lists;
  }

  async getList(id: ID): Promise<IList> {
    console.log(id);
    
    const query = { _id: new ObjectId(id) };
    const list = (await this.collection.findOne(query)) as IList;
    return list;
  }

  async deleteList(id: ID): Promise<boolean> {
    const query = { _id: new ObjectId(id) };
    const result = await this.collection.deleteOne(query);
    return (result && result.deletedCount > 0);
  }

  async changeListName(id: ID, name: string): Promise<IList> {
    const query = { _id: new ObjectId(id) };
    await this.collection.updateOne(query, { $set: { name } });
    const list = await this.getList(id);
    return list;
  }
}

export {
  MongoDBListService
};
