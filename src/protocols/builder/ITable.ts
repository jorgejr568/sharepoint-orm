import { IClient, IOrder, IWhere, TWhereOperator } from '..'
import { IWhereRaw } from './IWhereRaw'
import { TOrderDirection, TStringNumber } from '../types'

export interface ITable {
  _limit: number
  _offset: number
  _select: string[]
  _expand: string[]
  _where: (IWhere | IWhereRaw)[]
  _order?: IOrder
  readonly _table: string

  /**
   * GETTERS
   */
  client(): IClient

  /**
   * SETTERS
   */
  authorization(token: string, isRequestDigest?: boolean): ITable

  /**
   * SELECT
   */
  select(...columns: string[]): ITable

  expand(...lists: string[]): ITable

  /**
   * ORDER
   */
  order(column: string, direction: TOrderDirection): ITable

  /**
   * FILTER
   */
  where(
    column: string,
    operator: TWhereOperator,
    value: TStringNumber,
    not?: boolean,
    or?: boolean
  ): ITable
  orWhere(
    column: string,
    operator: TWhereOperator,
    value: TStringNumber
  ): ITable
  whereNot(
    column: string,
    operator: TWhereOperator,
    value: TStringNumber
  ): ITable
  orWhereNot(
    column: string,
    operator: TWhereOperator,
    value: TStringNumber
  ): ITable

  whereRaw(raw: string, or?: boolean): ITable
  orWhereRaw(raw: string): ITable

  /**
   * PAGINATION
   */
  limit(limit: number): ITable
  offset(offset: number): ITable

  /**
   * ACTIONS
   */
  get(): Promise<any[]>
  first(): Promise<any>

  insertGetId(values: Object): Promise<string>
  update(values: Object): Promise<void>
  delete(): Promise<void>
}
