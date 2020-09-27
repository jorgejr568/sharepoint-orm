import { IUserModel } from './IUserModel'

export interface IUser {
  authorize(requestDigestToken?: string): Promise<string>
  current(token?: string): Promise<IUserModel>
  impersonate(userId: string): Promise<IUserModel>
}
