import { IUserModel, IUser, IClient } from '../protocols'
import { SPUserNormalizer } from '../normalizers'
import { Builder } from '../builder'

export const AuthorizationKey = (isRequestDigest?: boolean) =>
  (
    typeof isRequestDigest === 'undefined'
      ? Builder.requestDigest()
      : isRequestDigest
  )
    ? 'X-REQUESTDIGEST'
    : 'Authorization'

export class User implements IUser {
  private readonly client: IClient
  constructor(client: IClient) {
    this.client = client
  }

  async authorize(requestDigestToken?: string): Promise<string> {
    if (requestDigestToken) {
      Builder.requestDigest(true)
      return Builder.authorization(requestDigestToken)
    }

    const { clientConfig } = this.client
    const { data: token } = await this.client.request(
      'API',
      'GET',
      `/api/token/GenerateTokenSP/${clientConfig.application}/${clientConfig.environment}/${clientConfig.tokenApi}`
    )
    return Builder.authorization(`Bearer ${token.toString()}`)
  }

  async refreshToken(): Promise<string> {
    const {
      data: { FormDigestValue: token },
    } = await this.client.request('SP', 'GET', `/_api/contextinfo`, {
      [AuthorizationKey()]: Builder.authorization(),
    })

    return Builder.authorization(token)
  }

  async current(token?: string): Promise<IUserModel> {
    const { data: spUser } = await this.client.request(
      'SP',
      'GET',
      '/_api/web/currentuser/?$expand=groups',
      {
        [AuthorizationKey()]: token || Builder.authorization(),
      }
    )

    return SPUserNormalizer(spUser)
  }

  async impersonate(userId: string): Promise<IUserModel> {
    const { data: spUser } = await this.client.request(
      'SP',
      'GET',
      `/_api/Web/GetUserById(${userId})?$expand=Groups`,
      {
        [AuthorizationKey()]: Builder.authorization(),
      }
    )

    return SPUserNormalizer(spUser)
  }
}
