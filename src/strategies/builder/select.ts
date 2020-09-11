import { ITable } from '../../protocols'
import { SPListItemNormalizer } from '../../normalizers'

export async function SelectStrategy(table: ITable): Promise<any[]> {
  const selectFields = table._select.join(',')
  const expandableLists = table._expand.join(',')

  const {
    data: { value: items },
  } = await table.client().request(
    'SP',
    'GET',
    `/_api/web/lists/getbytitle('${table._table}')/items`,
    {},
    {
      $select: selectFields,
      $expand: expandableLists,
      $orderby: table._order?.column,
      $skiptoken: 'Paged',
      $top: 5000,
    }
  )

  return items.map(SPListItemNormalizer)
}
