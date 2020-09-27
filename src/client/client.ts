import { IClient, IConfig, TInstance } from '../protocols'
import axios, { AxiosInstance, AxiosResponse, Method } from 'axios'
import { AuthorizationKey } from '../auth'

export class Client implements IClient {
  private readonly spAxiosInstance: AxiosInstance
  private readonly apiAxiosInstance: AxiosInstance
  readonly clientConfig: IConfig
  _authorization?: string
  _isRequestDigest?: boolean

  constructor(clientConfig: IConfig) {
    this.clientConfig = clientConfig
    this.apiAxiosInstance = axios.create({
      baseURL: clientConfig.apiUrl,
    })
    this.spAxiosInstance = axios.create({
      baseURL: clientConfig.spUrl,
    })
  }

  authorization(token: string, isRequestDigest?: boolean) {
    this._authorization = token
    this._isRequestDigest = isRequestDigest
  }

  request(
    instance: TInstance,
    method: Method,
    path: string,
    headers?: object,
    params?: object,
    data?: any
  ): Promise<AxiosResponse> {
    let axiosInstance: AxiosInstance = this.spAxiosInstance
    if (instance.toLowerCase() === 'api') axiosInstance = this.apiAxiosInstance

    return axiosInstance.request({
      url: path,
      method,
      headers: Object.assign(
        { [AuthorizationKey(this._isRequestDigest)]: this._authorization },
        headers
      ),
      params,
      data,
    })
  }
}
