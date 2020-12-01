export type TProfilePictureSize = 'S' | 'M' | 'L'

export const GetProfilePictureUrlStrategy = (
  spUrl: string,
  email: string,
  size: TProfilePictureSize = 'M'
) => {
  return `${GetBaseUrl(
    spUrl
  )}/_layouts/15/userphoto.aspx?size=${size}&username=${email}****`
}

const GetBaseUrl = (spUrl: string): string => {
  const pathArray = spUrl.split('/')
  const protocol = pathArray[0]
  const host = pathArray[2]
  return protocol + '//' + host
}
