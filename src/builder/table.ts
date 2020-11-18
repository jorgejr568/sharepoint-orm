import { IClient, IOrder, ITable, IWhere, TWhereOperator } from '../protocols'
import {
  DeleteStrategy,
  InsertGetIdStrategy,
  SelectStrategy,
  UpdateStrategy,
} from '../strategies'
import { IWhereRaw } from '../protocols/builder/IWhereRaw'
import { TStringNumber } from '../protocols/types/StringOrNumber'
import { TOrderDirection } from '../protocols/types/OrderDirection'

export class Table implements ITable {
  _limit: number = 5000
  _offset: number = 0
  _select: string[] = []
  _expand: string[] = []
  _where: (IWhere | IWhereRaw)[] = []
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

  authorization(token: string, isRequestDigest?: boolean): ITable {
    this._client.authorization(token, isRequestDigest)
    return this
  }

  select(...columns: string[]): ITable {
    this._select = columns
    return this
  }

  expand(...lists: string[]): ITable {
    this._expand = lists
    return this
  }

  order(column: string, direction: TOrderDirection = 'ASC'): ITable {
    this._order = {
      column,
      direction,
    }

    return this
  }

  limit(limit: number): ITable {
    this._limit = limit
    return this
  }
  offset(offset: number): ITable {
    this._offset = offset
    return this
  }

  async get(): Promise<any[]> {
    return SelectStrategy(this)
  }

  async first(): Promise<any> {
    return (await this.get())[0]
  }

  async last(): Promise<any> {
    return (await this.get()).reverse()[0]
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

  where(
    column: string,
    operator: TWhereOperator,
    value: TStringNumber,
    not?: boolean,
    or?: boolean
  ): ITable {
    this._where.push({
      column,
      operator,
      value,
      not,
      or,
    })
    return this
  }

  orWhere(
    column: string,
    operator: TWhereOperator,
    value: TStringNumber
  ): ITable {
    return this.where(column, operator, value, false, true)
  }

  orWhereNot(
    column: string,
    operator: TWhereOperator,
    value: TStringNumber
  ): ITable {
    return this.where(column, operator, value, true, true)
  }

  whereNot(
    column: string,
    operator: TWhereOperator,
    value: TStringNumber
  ): ITable {
    return this.where(column, operator, value, true, false)
  }

  whereRaw(raw: string, or?: boolean): ITable {
    this._where.push({
      raw,
      or,
    })
    return this
  }

  orWhereRaw(raw: string): ITable {
    return this.whereRaw(raw, true)
  }
}
