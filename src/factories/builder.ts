import { IConfig } from '../protocols'
import { Table } from '../builder'
import { ClientFactory } from './client'

export const BuilderFactory = (config: IConfig) => (table: string) => {
  const client = ClientFactory(config)
  return new Table(client, table)
}
