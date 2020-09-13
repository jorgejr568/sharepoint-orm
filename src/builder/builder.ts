import { IClient, ITable } from '../protocols'
import { Table } from './table'

export class Builder {
  private static _authorization: string
  private readonly _client

  constructor(client: IClient) {
    this._client = client
  }

  static authorization(token?: string): string {
    if (token) Builder._authorization = token
    return Builder._authorization
  }

  table(tableName: string): ITable {
    return new Table(this._client, tableName).authorization(
      Builder._authorization
    )
  }
}
