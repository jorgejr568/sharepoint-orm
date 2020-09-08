import { AxiosInstance } from 'axios'
import { IOrder, ITable, ITableRows, IWhere } from '../protocols'
import {
  DeleteStrategy,
  InsertGetIdStrategy,
  SelectStrategy,
  UpdateStrategy,
} from '../strategies'

export class Table implements ITable {
  private _limit: Number = 10
  private _offset: Number = 0
  private _select: String[] = []
  private _where: IWhere[] = []
  private _order?: IOrder
  private readonly _client
  private _table: String

  constructor(client: AxiosInstance, table: String) {
    this._client = client
    this._table = table
  }

  client(): AxiosInstance {
    return this._client
  }

  select(columns: String[]): ITable {
    this._select = columns
    return this
  }

  order(column: String, direction: String = 'ASC'): ITable {
    this._order = {
      column,
      direction,
    }

    return this
  }

  limit(limit: Number): ITable {
    this._limit = limit
    return this
  }
  offset(offset: Number): ITable {
    this._offset = offset
    return this
  }

  where(column: String, operator: String, value: String): ITable {
    this._where.push({
      column,
      operator,
      value,
    })

    return this
  }

  async get(): Promise<ITableRows[]> {
    return SelectStrategy(this)
  }
  insertGetId(values: Object): Promise<String> {
    return InsertGetIdStrategy(this, values)
  }
  update(values: Object): Promise<void> {
    return UpdateStrategy(this, values)
  }
  delete(): Promise<void> {
    return DeleteStrategy(this)
  }
}
