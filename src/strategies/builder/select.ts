import { ITable } from '../../protocols'
import { SPListItemNormalizer } from '../../normalizers'
import { WhereConditionToFilterStrategy } from '../where-condition-to-filter'

export async function SelectStrategy(table: ITable): Promise<any[]> {
  const {
    data: { value: items },
  } = await table.client().request(
    'SP',
    'GET',
    `/_api/web/lists/getbytitle('${
      table._table
    }')/items?$filter=${WhereConditionToFilterStrategy(table._where)}`,
    {},
    {
      $select: table._select.join(','),
      $expand: table._expand.join(','),
      $orderby: table._order?.column || '',
      $skiptoken: 'Paged=TRUE',
      $top: table._limit,
    }
  )

  return items.map(SPListItemNormalizer)
}
