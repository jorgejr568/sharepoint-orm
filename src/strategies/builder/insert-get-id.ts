import { ITable } from '../../protocols'

export async function InsertGetIdStrategy(
  table: ITable,
  values: Object
): Promise<String> {
  return 'any_id'
}
