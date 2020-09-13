import { IUserModel, IUser, IClient } from '../protocols'
import { SPUserNormalizer } from '../normalizers'
import { Builder } from '../builder'

export class User implements IUser {
  private readonly client: IClient
  constructor(client: IClient) {
    this.client = client
  }

  async authorize(): Promise<string> {
    const { clientConfig } = this.client
    const { data: token } = await this.client.request(
      'API',
      'GET',
      `/api/token/GenerateTokenSP/${clientConfig.application}/${clientConfig.environment}/${clientConfig.tokenApi}`
    )
    return Builder.authorization(`Bearer ${token.toString()}`)
  }

  async current(token?: string): Promise<IUserModel> {
    const { data: spUser } = await this.client.request(
      'SP',
      'GET',
      '/_api/web/currentuser/?$expand=groups',
      {
        Authorization: token || Builder.authorization(),
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
        Authorization: Builder.authorization(),
      }
    )

    return SPUserNormalizer(spUser)
  }
}
