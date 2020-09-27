import { AxiosInstance, AxiosResponse, Method } from 'axios'
import { IConfig } from './IConfig'

export type TInstance = 'sp' | 'SP' | 'api' | 'API'

export interface IClient {
  readonly clientConfig: IConfig
  _authorization?: string

  authorization(token: string, isRequestDigest?: boolean): void

  request(
    instance: TInstance,
    method: Method,
    path: string,
    headers?: object,
    params?: object,
    data?: any
  ): Promise<AxiosResponse>
}
