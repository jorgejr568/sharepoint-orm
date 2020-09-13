export const SPListItemNormalizer = (listItem: any): any => {
  if (listItem !== null && typeof listItem === 'object') {
    const strLoweredPropertiesListItem: any = {}
    Object.entries(listItem).forEach(([key, value]) => {
      strLoweredPropertiesListItem[key.toLowerCase()] = SPListItemNormalizer(
        value
      )
    })
    return strLoweredPropertiesListItem
  }
  return listItem
}
