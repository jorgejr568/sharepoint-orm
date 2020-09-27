import { ITable } from '../../protocols'
import { SPListItemNormalizer } from '../../normalizers'
import { WhereConditionToFilterStrategy } from '../where-condition-to-filter'

export async function SelectStrategy(table: ITable): Promise<any[]> {
  const {
    data: { value: items },
  } = await table.client().request(
    'SP',
    'GET',
    `/_api/web/lists/getbytitle('${table._table}')/items`,
    {},
    {
      $select: table._select.join(','),
      $expand: table._expand.join(','),
      $filter: WhereConditionToFilterStrategy(table._where),
      $orderby: table._order?.column,
    }
  )

  return items.map(SPListItemNormalizer)
}
