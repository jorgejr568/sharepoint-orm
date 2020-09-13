import { IConfig } from '../protocols'
import { ClientFactory } from './client'
import { Builder } from '../builder/builder'

export const BuilderFactory = (config: IConfig): Builder =>
  new Builder(ClientFactory(config))
