import { ITableRows } from './ITableRows'
import { AxiosInstance } from 'axios'

export interface ITable {
  /**
   * GETTERS
   */
  client(): AxiosInstance

  /**
   * SELECT
   */
  select(columns: String[]): ITable

  /**
   * ORDER
   */
  order(column: String, direction: String): ITable

  /**
   * FILTER
   */
  where(column: String, operator: String, value: String): ITable

  /**
   * PAGINATION
   */
  limit(limit: Number): ITable
  offset(offset: Number): ITable

  /**
   * ACTIONS
   */
  get(): Promise<ITableRows[]>
  insertGetId(values: Object): Promise<String>
  update(values: Object): Promise<void>
  delete(): Promise<void>
}
