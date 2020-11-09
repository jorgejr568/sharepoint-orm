import { IUserModel } from './IUserModel'
import { TStringNumber } from '../types'

export interface IUser {
  authorize(requestDigestToken?: string): Promise<string>
  refreshToken(): Promise<string>
  current(token?: string): Promise<IUserModel>
  impersonate(userId: TStringNumber): Promise<IUserModel>
}
