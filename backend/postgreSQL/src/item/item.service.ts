import { PoolClient } from "pg";
import { ID, IItem, ItemService } from "../../../common";

class PostgreSQLItemService implements ItemService {

  constructor(private database: PoolClient){}

  async createItem(item: IItem): Promise<IItem> {
    const query = `INSERT INTO item (list_id, description, checked) VALUES ($1, $2, $3)`;
    const result = await this.database.query(query, [item.listId, item.description, item.checked]);
    return result.rows[0] as IItem;
  }

  async getItems(listId: ID): Promise<IItem[]> {
    const query = `SELECT * FROM item WHERE list_id = ${listId} ORDER BY _id ASC`;
    const items = (await this.database.query(query)).rows as IItem[];
    return items;
  }

  async getItem(listId: ID, id: ID): Promise<IItem> {
    const query = `SELECT * FROM item WHERE list_id = ${listId} AND _id = ${id} ORDER BY _id ASC`;
    const item = (await this.database.query(query)).rows[0] as IItem;
    return item;
  }

  async deleteItem(listId: ID, id: ID): Promise<boolean> {
    const query = `DELETE FROM item WHERE list_id = $1 AND _id = $2`;
    const result = await this.database.query(query, [listId, id]);
    return (result && result.rowCount > 0);
  }

  async changeItemDescription(listId: ID, id: ID, description: string): Promise<IItem> {
    const query = `UPDATE item SET description = $1 WHERE list_id = $2 AND _id = $3`;
    const result = await this.database.query(query, [description, listId, id]);
    return result.rows[0] as IItem;
  }

  async changeItemChecked(listId: ID, id: ID, checked: boolean): Promise<IItem> {
    const query = `UPDATE item SET checked = $1 WHERE list_id = $2 AND _id = $3`;
    const result = await this.database.query(query, [checked, listId, id]);
    return result.rows[0] as IItem;
  }
}

export {
  PostgreSQLItemService
};
