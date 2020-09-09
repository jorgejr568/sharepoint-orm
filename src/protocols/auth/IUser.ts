import { IUserModel } from './IUserModel'

export interface IUser {
  authorize(): Promise<string>
  current(token: string): Promise<IUserModel>
  impersonate(userId: string): Promise<IUserModel>
}
