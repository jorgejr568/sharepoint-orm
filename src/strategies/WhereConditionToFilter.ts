import { IWhere } from '../protocols'

export const WhereConditionToFilterStrategy = (conditions: IWhere[]) =>
  conditions
    .map(
      (condition: IWhere) =>
        `${condition.column} ${condition.operator} ${condition.value}`
    )
    .join(' AND ')
