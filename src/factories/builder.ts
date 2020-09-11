import { IConfig, ITable } from '../protocols'
import { Table } from '../builder'
import { ClientFactory } from './client'

export const BuilderFactory = (config: IConfig) => (table: string): ITable =>
  new Table(ClientFactory(config), table)
