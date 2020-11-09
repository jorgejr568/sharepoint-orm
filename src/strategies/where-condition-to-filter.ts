import { IWhere, IWhereRaw } from '../protocols'

type TAnyWhere = IWhere | IWhereRaw

export const isWhereRaw = (condition: TAnyWhere) => 'raw' in condition

export const onlyWhereConditions = (where: TAnyWhere[]) =>
  <IWhere[]>where.filter((condition) => !isWhereRaw(condition))

const ternaryString = (
  condition: boolean,
  whenTrue: string,
  whenFalse: any = ''
) => (condition ? whenTrue : whenFalse)

const conjunction = (index: number, or?: boolean) =>
  ternaryString(index > 0, ternaryString(!!or, 'or', 'and'))

export const WhereConditionToFilterStrategy = (conditions: TAnyWhere[]) =>
  conditions
    .map((condition, index) => {
      if (isWhereRaw(condition)) {
        condition = <IWhereRaw>condition
        return `${conjunction(index, condition.or)} ${condition.raw}`
      }

      condition = <IWhere>condition
      return `${conjunction(index, condition.or)} ${
        condition.column
      } ${ternaryString(!!condition?.not, 'not')} ${
        condition.operator
      } ${ternaryString(
        typeof condition.value === 'string',
        `'${condition.value.toString().replace(/'/g, `\\'`)}'`,
        condition.value
      )}`
    })
    .join(' ')
    .trim()
