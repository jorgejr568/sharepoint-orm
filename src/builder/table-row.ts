import { ITableRows } from '../protocols'

export class TableRow implements ITableRows {
  private readonly _data

  constructor(data: any) {
    this._data = data
  }

  data() {
    return this._data
  }
}
