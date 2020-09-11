export const SPListItemNormalizer = (listItem: any): any => {
  if (typeof listItem === 'object') {
    const strLoweredPropertiesListItem: any = {}
    Object.entries(listItem).forEach(([key, value]) => {
      strLoweredPropertiesListItem[key.toLowerCase()] = value
    })
    return strLoweredPropertiesListItem
  }
  return listItem
}
