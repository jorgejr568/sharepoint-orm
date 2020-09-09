import { IClient, IConfig } from '../protocols'
import { Client } from '../client/client'

export function ClientFactory(config: IConfig): IClient {
  return new Client(config)
}
