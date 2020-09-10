import { ITable } from '../../protocols'

export async function InsertGetIdStrategy(
  table: ITable,
  values: Object
): Promise<string> {
  const {
    data: {
      d: { Id: id },
    },
  } = await table.client().request(
    'SP',
    'POST',
    `/_api/Web/Lists/GetByTitle('${table._table}')/Items`,
    {
      contentType: 'application/json;odata=verbose',
      accept: 'application/json;odata=verbose',
    },
    {},
    values
  )

  return id.toString()
}
