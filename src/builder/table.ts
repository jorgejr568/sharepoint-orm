import { IClient, IOrder, ITable, ITableRows, IWhere } from '../protocols'
import {
  DeleteStrategy,
  InsertGetIdStrategy,
  SelectStrategy,
  UpdateStrategy,
} from '../strategies'

export class Table implements ITable {
  _limit: Number = 10
  _offset: Number = 0
  _select: string[] = []
  _expand: string[] = []
  _where: IWhere[] = []
  _order?: IOrder
  private readonly _client
  readonly _table: string

  constructor(client: IClient, table: string) {
    this._client = client
    this._table = table
  }

  client(): IClient {
    return this._client
  }

  authorization(token: string): ITable {
    this._client.authorization(token)
    return this
  }

  select(columns: string[]): ITable {
    this._select = columns
    return this
  }

  expand(lists: string[]): ITable {
    this._expand = lists
    return this
  }

  order(column: string, direction: string = 'ASC'): ITable {
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

  where(column: string, operator: string, value: string): ITable {
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
  insertGetId(values: Object): Promise<string> {
    return InsertGetIdStrategy(this, values)
  }
  update(values: Object): Promise<void> {
    return UpdateStrategy(this, values)
  }
  delete(): Promise<void> {
    return DeleteStrategy(this)
  }
}
