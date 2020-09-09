import { IGroupModel } from '../protocols'

export const SPGroupNormalizer = (spGroup: any): IGroupModel => ({
  id: spGroup.Id.toString(),
  title: spGroup.Title.toString(),
})
