import { IWhere, IWhereRaw } from '../protocols'

export const isWhereRaw = (condition: IWhere | IWhereRaw) => 'raw' in condition

export const onlyWhereConditions = (where: (IWhere | IWhereRaw)[]) =>
  <IWhere[]>where.filter((condition) => !isWhereRaw(condition))

const conjunction = (index: number, or?: boolean) =>
  index > 0 && or ? 'or' : 'and'

export const WhereConditionToFilterStrategy = (
  conditions: (IWhere | IWhereRaw)[]
) =>
  conditions
    .map((condition, index) => {
      if (isWhereRaw(condition)) {
        condition = <IWhereRaw>condition
        return `${conjunction(index, condition.or)} ${condition.raw}`
      }

      condition = <IWhere>condition
      return `${conjunction(index, condition.or)} ${condition.column} ${
        condition?.not && 'not'
      } ${condition.operator} ${condition.value}`
    })
    .join(' ')
