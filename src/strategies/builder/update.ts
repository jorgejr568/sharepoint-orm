import { ITable } from '../../protocols'
import { onlyWhereConditions } from '../where-condition-to-filter'

export async function UpdateStrategy(
  table: ITable,
  values: Object
): Promise<void> {
  const idCondition = onlyWhereConditions(table._where).find(
    (condition: any) => condition.column.toLowerCase() === 'id'
  )

  if (!idCondition)
    throw new Error('Id on where condition was not specified at UpdateStrategy')

  await table.client().request(
    'SP',
    'POST',
    `/_api/Web/Lists/GetByTitle('${table._table}')/Items(${idCondition.value})`,
    {
      contentType: 'application/json;odata=verbose',
      accept: 'application/json;odata=verbose',
      'IF-MATCH': '*',
      'X-HTTP-Method': 'MERGE',
    },
    {},
    values
  )
}
