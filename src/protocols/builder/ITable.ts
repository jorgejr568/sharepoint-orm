import { ITableRows } from './ITableRows'
import { IClient } from '..'

export interface ITable {
  /**
   * GETTERS
   */
  client(): IClient

  /**
   * SELECT
   */
  select(columns: string[]): ITable

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
  limit(limit: Number): ITable
  offset(offset: Number): ITable

  /**
   * ACTIONS
   */
  get(): Promise<ITableRows[]>
  insertGetId(values: Object): Promise<string>
  update(values: Object): Promise<void>
  delete(): Promise<void>
}
