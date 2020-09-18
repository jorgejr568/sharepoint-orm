export type TWhereOperator = 'eq' | 'ne' | 'gt' | 'ge' | 'lt' | 'le'

export interface IWhere {
  column: string
  operator: string
  value: string
  not?: boolean
  or?: boolean
}
