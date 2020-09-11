import { IConfig, IUser } from '../protocols'
import { User } from '../auth'
import { ClientFactory } from './client'

export const AuthFactory = (config: IConfig): IUser =>
  new User(ClientFactory(config))
