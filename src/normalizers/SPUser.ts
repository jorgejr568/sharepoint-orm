import { IUserModel } from '../protocols'
import { SPGroupNormalizer } from './SPGroup'

export const SPUserNormalizer = (spUser: any): IUserModel => ({
  id: spUser.Id,
  email: spUser.Email,
  title: spUser.Title,
  username: spUser.LoginName,
  groups: spUser.group.map(SPGroupNormalizer),
})
