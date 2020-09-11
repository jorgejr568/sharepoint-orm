import { IUserModel, IUser, IClient } from '../protocols'
import { SPUserNormalizer } from '../normalizers'

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
    return `Bearer ${token.toString()}`
  }

  async current(token: string): Promise<IUserModel> {
    const { data: spUser } = await this.client.request(
      'SP',
      'GET',
      '/_api/web/currentuser/?$expand=groups',
      {
        Authorization: token,
      }
    )

    return SPUserNormalizer(spUser)
  }

  async impersonate(userId: string): Promise<IUserModel> {
    const { data: spUser } = await this.client.request(
      'SP',
      'GET',
      `/_api/Web/GetUserById(${userId})?$expand=Groups`
    )

    return SPUserNormalizer(spUser)
  }
}
