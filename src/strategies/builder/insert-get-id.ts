import { ITable } from '../../protocols'

export async function InsertGetIdStrategy(
  table: ITable,
  values: Object
): Promise<string> {
  return 'any_id'
}
