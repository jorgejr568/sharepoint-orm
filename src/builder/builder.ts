import { IClient, ITable } from '../protocols'
import { Table } from './table'

export class Builder {
  private static _authorization: string
  private static _isRequestDigest: boolean
  private readonly _client

  constructor(client: IClient) {
    this._client = client
  }

  static authorization(token?: string): string {
    if (token) Builder._authorization = token
    return Builder._authorization
  }

  static requestDigest(is?: boolean): boolean {
    if (is) Builder._isRequestDigest = is
    return Builder._isRequestDigest
  }

  table(tableName: string): ITable {
    return new Table(this._client, tableName).authorization(
      Builder.authorization(),
      Builder.requestDigest()
    )
  }
}
