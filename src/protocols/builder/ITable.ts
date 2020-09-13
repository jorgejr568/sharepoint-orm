import { IClient, IOrder, IWhere } from '..'

export interface ITable {
  _limit: number
  _offset: number
  _select: string[]
  _expand: string[]
  _where: IWhere[]
  _order?: IOrder
  readonly _table: string

  /**
   * GETTERS
   */
  client(): IClient

  /**
   * SETTERS
   */
  authorization(token: string): ITable

  /**
   * SELECT
   */
  select(...columns: string[]): ITable

  expand(...lists: string[]): ITable

  /**
   * ORDER
   */
  order(column: string, direction: string): ITable

  /**
   * FILTER
   */
  where(column: string, operator: string, value: string): ITable

  /**
   * PAGINATION
   */
  limit(limit: number): ITable
  offset(offset: number): ITable

  /**
   * ACTIONS
   */
  get(): Promise<any[]>
  insertGetId(values: Object): Promise<string>
  update(values: Object): Promise<void>
  delete(): Promise<void>
}
