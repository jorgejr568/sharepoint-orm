import { TStringNumber } from '../types'

export type TWhereOperator = 'eq' | 'ne' | 'gt' | 'ge' | 'lt' | 'le'

export interface IWhere {
  column: string
  operator: string
  value: TStringNumber
  not?: boolean
  or?: boolean
}
