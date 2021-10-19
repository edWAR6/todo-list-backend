import { PoolClient } from "pg";
import { ID, IList, ListService } from "../../../common";

class PostgreSQLListService implements ListService {

  constructor(private database: PoolClient){}

  async createList(list: IList): Promise<IList> {
    const query = `INSERT INTO list (name) VALUES ($1) RETURNING _id as id, name`;
    const result = await this.database.query(query, [list.name]);
    return result.rows[0] as IList;
  }

  async getLists(): Promise<IList[]> {
    const query = `SELECT * FROM list ORDER BY _id ASC`;
    const lists = (await this.database.query(query)).rows as IList[];
    return lists;
  }

  async getList(id: ID): Promise<IList> {
    const query = `SELECT * FROM list WHERE _id = ${id} ORDER BY _id ASC`;
    const list = (await this.database.query(query)).rows[0] as IList;
    return list;
  }

  async deleteList(id: ID): Promise<boolean> {
    const query = `DELETE FROM list WHERE _id = $1`;
    const result = await this.database.query(query, [id]);
    return (result && result.rowCount > 0);
  }

  async changeListName(id: ID, name: string): Promise<IList> {
    const query = `UPDATE list SET name = $1 WHERE _id = $2 RETURNING _id as id, name`;
    const result = await this.database.query(query, [name, id]);
    return result.rows[0] as IList;
  }
}

export {
  PostgreSQLListService
};
