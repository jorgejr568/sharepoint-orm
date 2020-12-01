import { IGroupModel } from './IGroupModel'

export interface IUserModel {
  id: string
  email: string
  title: string
  username: string
  groups: IGroupModel[]
  profile_picture: string
}
