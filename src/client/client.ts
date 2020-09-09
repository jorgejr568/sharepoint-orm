import { IClient, IConfig, TInstance } from '../protocols'
import axios, { AxiosInstance, AxiosResponse, Method } from 'axios'

export class Client implements IClient {
  private readonly spAxiosInstance: AxiosInstance
  private readonly apiAxiosInstance: AxiosInstance
  readonly clientConfig: IConfig

  constructor(clientConfig: IConfig) {
    this.clientConfig = clientConfig
    this.apiAxiosInstance = axios.create({
      baseURL: clientConfig.apiUrl,
    })
    this.spAxiosInstance = axios.create({
      baseURL: clientConfig.spUrl,
    })
  }

  request(
    instance: TInstance,
    method: Method,
    path: string,
    headers?: object,
    params?: object
  ): Promise<AxiosResponse> {
    let axiosInstance: AxiosInstance = this.spAxiosInstance
    if (instance.toLowerCase() === 'api') axiosInstance = this.apiAxiosInstance

    return axiosInstance.request({
      url: path,
      method,
      headers,
      params,
    })
  }
}
