import { IConfig } from '../protocols'
import { Table } from '../builder'
import { ClientFactory } from './client'

export const BuilderFactory = (config: IConfig) => (table: String) => {
  const client = ClientFactory(config)
  return new Table(client, table)
}
